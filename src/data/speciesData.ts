import { SpeciesData } from '@/store/useAppStore';

export const speciesDatabase: SpeciesData[] = [
  {
    name: 'Gangetic Dolphin',
    scientificName: 'Platanista gangetica',
    status: 'Endangered',
    population: 3000,
    habitat: 'Mainstream of Ganga and Brahmaputra rivers',
    description: 'The Ganges river dolphin is a freshwater dolphin species endemic to the Indian subcontinent. It is blind and navigates using echolocation.',
    threats: ['Pollution', 'Habitat degradation', 'Entanglement in fishing nets', 'Sand mining'],
  },
  {
    name: 'Gharial',
    scientificName: 'Gavialis gangeticus',
    status: 'Critical',
    population: 650,
    habitat: 'Deep, fast-flowing rivers with high sand banks',
    description: 'The gharial is a fish-eating crocodile with a long, narrow snout. It is one of the longest of all living crocodilians.',
    threats: ['Habitat loss', 'Water pollution', 'Illegal fishing', 'Riverbank modification'],
  },
  {
    name: 'Indian Softshell Turtle',
    scientificName: 'Nilssonia gangetica',
    status: 'Vulnerable',
    population: 5000,
    habitat: 'Slow-moving rivers, lakes, and ponds',
    description: 'A large freshwater turtle found in the Ganges and other rivers of northern India. It has a soft, leathery shell.',
    threats: ['Over-harvesting', 'Habitat destruction', 'Pollution', 'Predation'],
  },
  {
    name: 'Indian Major Carps',
    scientificName: 'Labeo rohita, Catla catla, Cirrhinus mrigala',
    status: 'Stable',
    population: 100000,
    habitat: 'Rivers, lakes, and reservoirs',
    description: 'The three major carp species form the backbone of Indian freshwater fisheries. They are herbivorous and feed on algae and aquatic plants.',
    threats: ['Overfishing', 'Habitat modification', 'Introduction of exotic species'],
  },
];

export function getSpeciesByName(name: string): SpeciesData | undefined {
  return speciesDatabase.find((s) => s.name === name);
}
