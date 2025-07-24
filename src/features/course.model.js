export default class Course {
  constructor(id, name, level, CEFR, description, month, year, version) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.CEFR = CEFR;
    this.description = description;
    this.month = month;
    this.year = year;
    this.version = version;
  }

  printName() {
    console.log(`Name: ${this.name}`);
  }
}
