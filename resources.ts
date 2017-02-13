export const infrastructure = {

  init(context: any): void {
    for (let attribute in context) {
      Object.prototype[attribute] = context[attribute];
    }
  }

};
