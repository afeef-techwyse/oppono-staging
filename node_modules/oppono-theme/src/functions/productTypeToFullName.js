const names = {
  first: 'First mortgage',
  second: 'Second mortgage',
  heloc: 'HELOC',
  beloc: 'BLOC',
}
export function productTypeToFullName(type) {return names[type];}
