const workersData = [
  {
    id: "001",
    name: "John Doe",
    skillSet: ["Harvesting", "Fertilizing"],
    historicalProductivity: [100, 150, 120], // Historical productivity values
    taskEfficiency: {
      harvesting: 90, // Efficiency percentage for harvesting
      fertilizing: 85,
      spraying: NaN, // NaN for tasks not applicable
    },
    availability: true, // Worker availability
    points: 1250, // Points earned by the worker
    group: "Group 2",
    role: "Member",
  },
  {
    id: "002",
    name: "Jane Smith",
    skillSet: ["Harvesting", NaN], // NaN value for skill
    historicalProductivity: [200, 250, 230],
    taskEfficiency: {
      harvesting: 95,
      fertilizing: NaN, // NaN for tasks not applicable
      spraying: 88,
    },
    availability: false,
    points: 1400,
    group: "Group 2",
    role: "Leader",
  },
  {
    id: "003",
    name: "Michael Johnson",
    skillSet: [NaN, "Fertilizing"], // NaN for undefined skill
    historicalProductivity: [180, 190, 170],
    taskEfficiency: {
      harvesting: NaN, // No harvesting skills
      fertilizing: 90,
      spraying: 85,
    },
    availability: true,
    points: 1130,
    group: "Group 3",
    role: "Member",
  },
  {
    id: "004",
    name: "Emily Davis",
    skillSet: ["Spraying"],
    historicalProductivity: [150, 160, 155],
    taskEfficiency: {
      harvesting: NaN, // No harvesting skills
      fertilizing: NaN, // No fertilizing skills
      spraying: 92,
    },
    availability: true,
    points: 980,
    group: "Group 3",
    role: "Member",
  },
  {
    id: "005",
    name: "David Martinez",
    skillSet: ["Harvesting", "Spraying"],
    historicalProductivity: [300, 310, 290],
    taskEfficiency: {
      harvesting: 98,
      fertilizing: NaN, // NaN for tasks not applicable
      spraying: 95,
    },
    availability: false,
    points: 1575,
    group: "Group 1",
    role: "Member",
  },
  {
    id: "006",
    name: "Emma Brown",
    skillSet: ["Fertilizing", "Spraying"],
    historicalProductivity: [140, 145, 150],
    taskEfficiency: {
      harvesting: NaN,
      fertilizing: 88,
      spraying: 90,
    },
    availability: true,
    points: 1450,
    group: "Group 1",
    role: "Member",
  },
  {
    id: "007",
    name: "Daniel Wilson",
    skillSet: [NaN, NaN], // Both skills unknown
    historicalProductivity: [120, 115, 110],
    taskEfficiency: {
      harvesting: NaN,
      fertilizing: NaN,
      spraying: NaN,
    },
    availability: true,
    points: 1030,
    group: "Group 3",
    role: "Member",
  },
  {
    id: "008",
    name: "Olivia Garcia",
    skillSet: ["Harvesting"],
    historicalProductivity: [220, 230, 215],
    taskEfficiency: {
      harvesting: 85,
      fertilizing: NaN,
      spraying: NaN,
    },
    availability: true,
    points: 1190,
    group: "Group 3",
    role: "Leader",
  },
  {
    id: "009",
    name: "James Miller",
    skillSet: ["Fertilizing", "Harvesting"],
    historicalProductivity: [300, 320, 310],
    taskEfficiency: {
      harvesting: 90,
      fertilizing: 92,
      spraying: 87,
    },
    availability: false,
    points: 1670,
    group: "Group 1",
    role: "Leader",
  },
  {
    id: "010",
    name: "Sophia Rodriguez",
    skillSet: ["Spraying"],
    historicalProductivity: [190, 200, 210],
    taskEfficiency: {
      harvesting: NaN,
      fertilizing: NaN,
      spraying: 93,
    },
    availability: true,
    points: 1320,
    group: "Group 2",
    role: "Member",
  },
  {
    id: "011",
    name: "Benjamin Lee",
    skillSet: ["Harvesting", "Fertilizing"],
    historicalProductivity: [160, 150, 155],
    taskEfficiency: {
      harvesting: 88,
      fertilizing: 85,
      spraying: NaN,
    },
    availability: true,
    points: 1285,
    group: "Group 2",
    role: "Member",
  },
  {
    id: "012",
    name: "Isabella White",
    skillSet: ["Harvesting", "Spraying"],
    historicalProductivity: [180, 190, 170],
    taskEfficiency: {
      harvesting: 95,
      fertilizing: NaN,
      spraying: 90,
    },
    availability: false,
    points: 1010,
    group: "Group 3",
    role: "Member",
  },
  {
    id: "013",
    name: "William Harris",
    skillSet: [NaN, "Fertilizing"],
    historicalProductivity: [240, 250, 260],
    taskEfficiency: {
      harvesting: NaN,
      fertilizing: 91,
      spraying: NaN,
    },
    availability: true,
    points: 1495,
    group: "Group 1",
    role: "Member",
  },
  {
    id: "014",
    name: "Charlotte Thompson",
    skillSet: ["Spraying"],
    historicalProductivity: [130, 120, 125],
    taskEfficiency: {
      harvesting: NaN,
      fertilizing: NaN,
      spraying: 89,
    },
    availability: true,
    points: 1360,
    group: "Group 1",
    role: "Member",
  },
  {
    id: "015",
    name: "Lucas Lewis",
    skillSet: ["Harvesting", "Fertilizing"],
    historicalProductivity: [250, 240, 245],
    taskEfficiency: {
      harvesting: 90,
      fertilizing: 88,
      spraying: NaN,
    },
    availability: false,
    points: 1235,
    group: "Group 2",
    role: "Member",
  },
];

workersData.sort((a, b) => b.points - a.points);
workersData.forEach((item, index) => {
  item.rank = index + 1;
});

export default workersData;
