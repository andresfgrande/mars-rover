interface MailPrimitives {
  id: number;
  subject: string;
  from: string;
  to: string;
  body: string;
}

export class Mail {
  private id: number;

  constructor(
    private subject: string,
    private from: string,
    private to: string,
    private body: string,
  ) {
    this.id = 4;
  }

  static fromPrimitives(primitives: MailPrimitives): Mail {
    const mail = new Mail(
      primitives.subject,
      primitives.from,
      primitives.to,
      primitives.body,
    );
    mail.id = primitives.id;
    return mail;
  }

  toPrimitives(): MailPrimitives {
    return {
      id: this.id,
      subject: this.subject,
      from: this.from,
      to: this.to,
      body: this.body,
    } as MailPrimitives;
  }
}

export class MailRepository {
  save(mail: Mail): void {
    mail.toPrimitives();
  }

  getById(id: number): Mail {
    return Mail.fromPrimitives({
      id: id,
      subject: 'gdfg',
      from: 'fgf',
      to: 'fgdf',
      body: 'dfgdf',
    });
  }
}

interface AddSubjectBuilder {
  addSubject(input: string): AddFromBuilder;
}

interface AddBodyBuilder {
  addBody(input: string): AddSubjectBuilder;
}

interface AddFromBuilder {
  addFrom(input: string): AddToBuilder;
}

interface AddToBuilder {
  addTo(input: string): BuildBuilder;
}

interface BuildBuilder {
  build(): Mail;
}

class MailBuilder
  implements
    AddSubjectBuilder,
    AddToBuilder,
    AddFromBuilder,
    AddBodyBuilder,
    BuildBuilder
{
  private subject: string;
  private from: string;
  private to: string;
  private body: string;

  private constructor() {
    //
  }

  static create(): AddBodyBuilder {
    return new MailBuilder();
  }

  build(): Mail {
    return new Mail(this.subject, this.from, this.to, this.body);
  }

  addBody(input: string): AddSubjectBuilder {
    this.body = input;
    return this;
  }

  addSubject(input: string): AddFromBuilder {
    this.subject = input;
    return this;
  }

  addFrom(input: string): AddToBuilder {
    this.from = input;
    return this;
  }

  addTo(input: string): MailBuilder {
    this.to = input;
    return this;
  }
}

describe('Mail Builder should', () => {
  it('be able to build body', () => {
    const builder = MailBuilder.create();

    const expectedMail = new Mail(
      'test subject',
      'andres',
      'marcos',
      'test body',
    );

    const mail = builder
      .addBody('test body')
      .addSubject('test subject')
      .addFrom('andres')
      .addTo('marcos')
      .build();

    expect(mail).toStrictEqual(expectedMail);
  });

  it('be able to build a new email with undefined parameters', () => {
    const builder = MailBuilder.create();

    const expectedMail = new Mail(undefined, 'andres', undefined, 'test body');

    const mail = builder
      .addBody('test body')
      .addSubject(undefined)
      .addFrom('andres')
      .addTo(undefined)
      .build();

    expect(mail).toStrictEqual(expectedMail);
  });

  /*it('be able to build subject', () => {
    const builder = new MailBuilder();

    const expectedMail = new Mail(
      'Builder pattern',
      undefined,
      undefined,
      undefined,
    );

    builder.addSubject('Builder pattern');

    const mail = builder.build();

    expect(mail).toStrictEqual(expectedMail);
  });

  it('be able to build from', () => {
    const builder = new MailBuilder();

    const expectedMail = new Mail(undefined, 'andres', undefined, undefined);

    builder.addFrom('andres');

    const mail = builder.build();

    expect(mail).toStrictEqual(expectedMail);
  });

  it('be able to build To', () => {
    const builder = new MailBuilder();

    const expectedMail = new Mail(undefined, undefined, 'marcos', undefined);

    builder.addTo('marcos');

    const mail = builder.build();

    expect(mail).toStrictEqual(expectedMail);
  });*/
});
