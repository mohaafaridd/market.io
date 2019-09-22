// This block is not for humans
export default (form, fields) =>
  [...form.elements]
    // filter elements if they have a name and that's valid for my field list
    .filter(element => element.name && fields.includes(element.name))
    // map over the filtered array to make an array of these objects
    .map(element => ({ name: element.name, value: element.value }))
    // Well, this reduce is from stackoverflow :v
    // reduce takes every element and assign it to the final Object
    .reduce(
      (obj, element) => Object.assign(obj, { [element.name]: element.value }),
      {}
    );

export const extractElement = (form, name) => {
  const element = [...form.elements]
    // filter elements if they have a name and that's valid for my field list
    .filter(element => element.name && name === element.name)[0];

  return element;
};
