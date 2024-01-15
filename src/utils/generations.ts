const generations = [
  {
    id: 1,
    offset: 0,
    limit: 151,
  },
  {
    id: 2,
    offset: 151,
    limit: 100,
  },
  {
    id: 3,
    offset: 251,
    limit: 135,
  },
  {
    id: 4,
    offset: 386,
    limit: 107,
  },
  {
    id: 5,
    offset: 493,
    limit: 156,
  },
  {
    id: 6,
    offset: 649,
    limit: 72,
  },
  {
    id: 7,
    offset: 721,
    limit: 88,
  },
  {
    id: 8,
    offset: 809,
    limit: 89,
  },
  {
    id: 9,
    offset: 809,
    limit: 96,
  },
  {
    id: 10,
    offset: 905,
    limit: 116,
  },
];

export function getGenerationById(id: number) {
  return generations.find((generation) => generation.id === id);
}

export default generations;
