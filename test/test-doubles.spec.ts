import { mock } from 'jest-mock-extended';

interface Source {
  getChar(): string;
}

interface Destination {
  setChar(value: string): void;
}

export class Copier {
  constructor(private source: Source, private destination: Destination) {}

  copy() {
    let next = true;
    let output = '';
    while (next) {
      const text = this.source.getChar();
      if (text !== '\\') {
        output += text;
      }

      if (text === '\\') {
        next = false;
      }
    }
    this.destination.setChar(output);
  }
}

export class FakeSource implements Source {
  private textSource: string;
  private currentIndex = 0;

  setFakeText(text: string): void {
    this.textSource = text;
  }

  getChar(): string {
    const char = this.textSource[this.currentIndex];
    this.currentIndex++;

    return char;
  }
}

export class FakeDestination implements Destination {
  private characters: string;

  setChar(value: string): void {
    console.log(value);
    this.characters = value;
  }

  getCharValue(): string {
    return this.characters;
  }
}

describe('Character copier', () => {
  describe('test doubles', () => {
    it('should read characters until character \\', () => {
      const fakeSource = new FakeSource();
      const fakeDestination = new FakeDestination();
      fakeSource.setFakeText('a\\');

      const copier = new Copier(fakeSource, fakeDestination);

      copier.copy();

      expect(fakeDestination.getCharValue()).toEqual('a');
    });

    it('should copy a character ', () => {
      const fakeSource = new FakeSource();
      const fakeDestination = new FakeDestination();
      fakeSource.setFakeText('b\\');

      const copier = new Copier(fakeSource, fakeDestination);

      copier.copy();

      expect(fakeDestination.getCharValue()).toEqual('b');
    });

    it('should copy characters ', () => {
      const fakeSource = new FakeSource();
      const fakeDestination = new FakeDestination();
      fakeSource.setFakeText('hola\\mundo');

      const copier = new Copier(fakeSource, fakeDestination);

      copier.copy();

      expect(fakeDestination.getCharValue()).toEqual('hola');
    });
  });

  describe('Mocks', () => {
    it('should read a character \\', () => {
      const fakeSource = mock<Source>();
      const fakeDestination = mock<Destination>();
      fakeSource.getChar.mockReturnValueOnce('a');
      fakeSource.getChar.mockReturnValueOnce('\\');
      const copier = new Copier(fakeSource, fakeDestination);

      copier.copy();

      expect(fakeDestination.setChar).toHaveBeenCalledWith('a');
    });

    it('should copy characters ', () => {
      const fakeSource = mock<Source>();
      const fakeDestination = mock<Destination>();

      fakeSource.getChar
        .mockReturnValueOnce('h')
        .mockReturnValueOnce('o')
        .mockReturnValueOnce('l')
        .mockReturnValueOnce('a')
        .mockReturnValueOnce('\\')
        .mockReturnValueOnce('m')
        .mockReturnValueOnce('u')
        .mockReturnValueOnce('n')
        .mockReturnValueOnce('d')
        .mockReturnValueOnce('o');

      const copier = new Copier(fakeSource, fakeDestination);

      copier.copy();

      expect(fakeDestination.setChar).toHaveBeenCalledWith('hola');
    });
  });
});
