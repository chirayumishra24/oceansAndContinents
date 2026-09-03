import { Question } from '../types/game';

export const QUESTIONS_BANK: Question[] = [
  // ----------------------------------------------------
  // OCEANS (1-15)
  // ----------------------------------------------------
  {
    id: 'ocean-01',
    question: 'Which is the largest and deepest ocean on Earth?',
    options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Pacific Ocean covers over 30% of Earth’s surface and contains the Mariana Trench, the deepest place on the planet.'
  },
  {
    id: 'ocean-02',
    question: 'Which ocean separates the Americas on the west from Europe and Africa on the east?',
    options: ['Pacific Ocean', 'Atlantic Ocean', 'Southern Ocean', 'Indian Ocean'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Atlantic Ocean forms an S-shape separating the Americas from Europe and Africa.'
  },
  {
    id: 'ocean-03',
    question: 'Which is the smallest and shallowest of Earth’s five oceans?',
    options: ['Indian Ocean', 'Southern Ocean', 'Arctic Ocean', 'Atlantic Ocean'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Arctic Ocean surrounds the North Pole and is mostly covered by sea ice throughout the year.'
  },
  {
    id: 'ocean-04',
    question: 'Which ocean is named directly after a major Asian country?',
    options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Southern Ocean'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Indian Ocean is named after India and is bounded by Africa, Asia, Australia, and the Southern Ocean.'
  },
  {
    id: 'ocean-05',
    question: 'Which ocean completely encircles the continent of Antarctica?',
    options: ['Southern Ocean', 'Pacific Ocean', 'Arctic Ocean', 'Atlantic Ocean'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Southern Ocean (also called the Antarctic Ocean) surrounds Antarctica south of 60° South latitude.'
  },
  {
    id: 'ocean-06',
    question: 'What is the deepest known location in the world’s oceans?',
    options: ['Java Trench', 'Puerto Rico Trench', 'Mariana Trench (Challenger Deep)', 'Sunda Trench'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Challenger Deep inside the Mariana Trench plunges nearly 11,000 meters (about 36,000 feet) down!'
  },
  {
    id: 'ocean-07',
    question: 'The famous ring of active volcanoes and earthquakes circling the Pacific is called:',
    options: ['The Fire Belt', 'The Ring of Fire', 'The Volcanic Arch', 'The Magma Circle'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Pacific Ring of Fire contains roughly 75% of the world’s active and dormant volcanoes.'
  },
  {
    id: 'ocean-08',
    question: 'True or False: Oceans cover more than 70% of the Earth’s surface.',
    options: ['True', 'False'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Oceans',
    type: 'true-false',
    explanation: 'Water covers approximately 71% of our planet, which is why Earth is called the "Blue Planet".'
  },
  {
    id: 'ocean-09',
    question: 'Which body of water connects the Atlantic Ocean directly to the Pacific Ocean in Central America?',
    options: ['Suez Canal', 'Panama Canal', 'Strait of Gibraltar', 'Bering Strait'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Panama Canal opened in 1914, cutting across the Isthmus of Panama to connect both mighty oceans.'
  },
  {
    id: 'ocean-10',
    question: 'The warm ocean current that flows from the Gulf of Mexico across the Atlantic to Europe is the:',
    options: ['California Current', 'Gulf Stream', 'Humboldt Current', 'Benguela Current'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Gulf Stream carries warm tropical water northward, moderating Western and Northern Europe’s climate.'
  },
  {
    id: 'ocean-11',
    question: 'Between North America and Asia lies which narrow body of water?',
    options: ['Bering Strait', 'Strait of Magellan', 'English Channel', 'Bosporus'],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Bering Strait connects the Arctic Ocean to the Bering Sea, separating Alaska (USA) and Russia.'
  },
  {
    id: 'ocean-12',
    question: 'The Bermuda Triangle is located in which ocean?',
    options: ['Pacific Ocean', 'Indian Ocean', 'Atlantic Ocean', 'Southern Ocean'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The western part of the North Atlantic Ocean contains the region often referred to as the Bermuda Triangle.'
  },
  {
    id: 'ocean-13',
    question: 'The Great Barrier Reef, the world’s largest coral reef system, is located in which sea connected to the Pacific?',
    options: ['Coral Sea', 'Red Sea', 'Baltic Sea', 'Black Sea'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Coral Sea off the northeastern coast of Australia is home to the spectacular Great Barrier Reef.'
  },
  {
    id: 'ocean-14',
    question: 'True or False: The Arctic Ocean stays completely ice-free during the summer.',
    options: ['True', 'False'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Oceans',
    type: 'true-false',
    explanation: 'False! While summer ice melts back, large portions of Arctic sea ice persist year-round.'
  },
  {
    id: 'ocean-15',
    question: 'Which of these seas has no coastline and is located entirely within the Atlantic Ocean?',
    options: ['Sargasso Sea', 'Tasman Sea', 'Adriatic Sea', 'Mediterranean Sea'],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Sargasso Sea is uniquely defined not by land boundaries, but by four ocean currents circulating in the North Atlantic.'
  },

  // ----------------------------------------------------
  // CONTINENTS (16-30)
  // ----------------------------------------------------
  {
    id: 'cont-01',
    question: 'Which is the largest continent by both land area and total population?',
    options: ['Africa', 'Asia', 'North America', 'Europe'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'Asia is the largest continent, covering roughly 30% of Earth’s land area and home to over 4.7 billion people.'
  },
  {
    id: 'cont-02',
    question: 'Which is the smallest continent by land area?',
    options: ['Europe', 'Antarctica', 'Australia / Oceania', 'South America'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'Australia is the smallest continent, often grouped with Pacific island nations as Oceania.'
  },
  {
    id: 'cont-03',
    question: 'Which continent has the most countries (54 recognized sovereign states)?',
    options: ['Asia', 'Africa', 'Europe', 'North America'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'Africa contains 54 independent countries recognized by the United Nations.'
  },
  {
    id: 'cont-04',
    question: 'Which continent is the coldest, windiest, and driest on Earth?',
    options: ['Europe', 'North America', 'Antarctica', 'Asia'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'Wait, Antarctica! Over 98% of Antarctica is covered by thick continental ice sheets.'
  },
  {
    id: 'cont-05',
    question: 'Which mountain range naturally divides Europe and Asia?',
    options: ['Ural Mountains', 'Alps', 'Rocky Mountains', 'Atlas Mountains'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'The Ural Mountains in Russia run from north to south, forming a conventional boundary between Europe and Asia.'
  },
  {
    id: 'cont-06',
    question: 'How many continents are there traditionally recognized in world geography?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'The 7 continents are Asia, Africa, North America, South America, Antarctica, Europe, and Australia/Oceania.'
  },
  {
    id: 'cont-07',
    question: 'Which continent lies entirely in the Southern and Western Hemispheres?',
    options: ['South America', 'Antarctica', 'Africa', 'Australia'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'While parts of South America are north of the Equator, only Antarctica is completely south, but South America spans west. Looking at South America, the Equator passes through Ecuador, Colombia, and Brazil!'
  },
  {
    id: 'cont-08',
    question: 'Which continent is known as the "Island Continent"?',
    options: ['Madagascar', 'Greenland', 'Australia', 'Antarctica'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'Australia is completely surrounded by water, earning it the title of the Island Continent.'
  },
  {
    id: 'cont-09',
    question: 'The Sahara Desert, the largest hot desert in the world, is on which continent?',
    options: ['Asia', 'South America', 'Africa', 'Australia'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'The Sahara spans across North Africa, covering an area nearly as large as the entire United States.'
  },
  {
    id: 'cont-10',
    question: 'The Amazon Rainforest and Amazon River are located in which continent?',
    options: ['Africa', 'South America', 'North America', 'Asia'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'The Amazon basin is predominantly situated in South America, spanning Brazil, Peru, Colombia, and neighboring nations.'
  },
  {
    id: 'cont-11',
    question: 'True or False: Antarctica has no permanent human residents or native countries.',
    options: ['True', 'False'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Continents',
    type: 'true-false',
    explanation: 'True! Only visiting scientists and researchers live temporarily at scientific stations in Antarctica.'
  },
  {
    id: 'cont-12',
    question: 'Mount Everest, the highest peak above sea level, is located on which continent?',
    options: ['Europe', 'North America', 'Asia', 'South America'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'Mount Everest stands at 8,848.86 meters on the border of Nepal and China in Asia.'
  },
  {
    id: 'cont-13',
    question: 'The Andes Mountains, the longest continental mountain range in the world, run along which continent?',
    options: ['North America', 'South America', 'Europe', 'Africa'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'The Andes stretch over 7,000 kilometers along the western edge of South America.'
  },
  {
    id: 'cont-14',
    question: 'Which continent has NO deserts at all?',
    options: ['Europe', 'North America', 'South America', 'Australia'],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'Europe is the only continent on Earth without any major natural desert biomes!'
  },
  {
    id: 'cont-15',
    question: 'Which continent is crossed by both the Equator and both the Tropic of Cancer and Tropic of Capricorn?',
    options: ['Asia', 'Africa', 'South America', 'Australia'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'Africa is the only continent through which all three primary latitude lines pass: Equator, Tropic of Cancer, and Tropic of Capricorn.'
  },

  // ----------------------------------------------------
  // COUNTRIES & CONTINENTS (31-42)
  // ----------------------------------------------------
  {
    id: 'cntry-01',
    question: 'Egypt and the famous Pyramids of Giza are located on which continent?',
    options: ['Asia', 'Africa', 'Europe', 'South America'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Countries & Continents',
    type: 'identify-continent',
    explanation: 'Egypt is in northeast Africa, with the Sinai Peninsula extending into Southwest Asia.'
  },
  {
    id: 'cntry-02',
    question: 'Brazil, the largest country where Portuguese is spoken, belongs to which continent?',
    options: ['North America', 'South America', 'Europe', 'Africa'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Countries & Continents',
    type: 'identify-continent',
    explanation: 'Brazil covers almost half of the South American continent!'
  },
  {
    id: 'cntry-03',
    question: 'Canada, Mexico, and the United States make up the majority of which continent?',
    options: ['South America', 'North America', 'Europe', 'Asia'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Countries & Continents',
    type: 'identify-continent',
    explanation: 'Canada, the USA, and Mexico are the three largest nations of North America.'
  },
  {
    id: 'cntry-04',
    question: 'Japan, South Korea, and India are countries situated in which continent?',
    options: ['Asia', 'Europe', 'Africa', 'Oceania'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Countries & Continents',
    type: 'identify-continent',
    explanation: 'India, Japan, and South Korea are all located across different regions of Asia.'
  },
  {
    id: 'cntry-05',
    question: 'Italy, France, and Germany are famous nations located in:',
    options: ['Europe', 'Asia', 'North America', 'South America'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Countries & Continents',
    type: 'identify-continent',
    explanation: 'France, Germany, and the boot-shaped peninsula of Italy are located in Western and Southern Europe.'
  },
  {
    id: 'cntry-06',
    question: 'Which country spans across two continents: Europe and Asia?',
    options: ['Brazil', 'Turkey', 'Australia', 'Nigeria'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Countries & Continents',
    type: 'multiple-choice',
    explanation: 'Both Turkey (and Russia) are transcontinental countries spanning both Europe and Asia.'
  },
  {
    id: 'cntry-07',
    question: 'New Zealand is part of which continental geographical region?',
    options: ['Asia', 'Oceania', 'Antarctica', 'South America'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Countries & Continents',
    type: 'identify-continent',
    explanation: 'New Zealand is located in the southwestern Pacific and is part of the Oceania region.'
  },
  {
    id: 'cntry-08',
    question: 'Madagascar, the world’s fourth-largest island, is off the southeast coast of which continent?',
    options: ['Asia', 'Africa', 'Australia', 'South America'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Countries & Continents',
    type: 'multiple-choice',
    explanation: 'Madagascar is an island nation located in the Indian Ocean off the east coast of Africa.'
  },
  {
    id: 'cntry-09',
    question: 'Greenland, the world’s largest island, is physically part of which continent?',
    options: ['Europe', 'North America', 'Asia', 'Antarctica'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'Countries & Continents',
    type: 'multiple-choice',
    explanation: 'Geographically and geologically, Greenland is part of the North American tectonic plate, though politically tied to Denmark in Europe.'
  },
  {
    id: 'cntry-10',
    question: 'In which continent would you find the country of Peru and the ancient citadel of Machu Picchu?',
    options: ['South America', 'North America', 'Europe', 'Africa'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Countries & Continents',
    type: 'identify-continent',
    explanation: 'Peru is located on the western coast of South America.'
  },
  {
    id: 'cntry-11',
    question: 'The countries of Kenya, Nigeria, and South Africa are located in which continent?',
    options: ['Africa', 'Asia', 'South America', 'Europe'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Countries & Continents',
    type: 'identify-continent',
    explanation: 'Kenya (East), Nigeria (West), and South Africa (South) are prominent African nations.'
  },
  {
    id: 'cntry-12',
    question: 'Which country is both a country and an entire continent on its own?',
    options: ['Greenland', 'Australia', 'Iceland', 'India'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Countries & Continents',
    type: 'multiple-choice',
    explanation: 'Australia is unique as the only nation that governs an entire continent.'
  },

  // ----------------------------------------------------
  // WORLD GEOGRAPHY & MAP SKILLS (43-52)
  // ----------------------------------------------------
  {
    id: 'geo-01',
    question: 'What is the imaginary 0-degree line of latitude that divides the Earth into Northern and Southern Hemispheres?',
    options: ['Prime Meridian', 'The Equator', 'Tropic of Cancer', 'Arctic Circle'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'World Geography',
    type: 'multiple-choice',
    explanation: 'The Equator sits at 0° latitude and splits Earth into northern and southern halves.'
  },
  {
    id: 'geo-02',
    question: 'What is the 0-degree line of longitude that runs through Greenwich, England?',
    options: ['The Equator', 'Prime Meridian', 'International Date Line', 'Tropic of Capricorn'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'World Geography',
    type: 'multiple-choice',
    explanation: 'The Prime Meridian is the reference line for 0° longitude, dividing the Eastern and Western Hemispheres.'
  },
  {
    id: 'geo-03',
    question: 'Lines that run north to south and measure distance east or west are called lines of:',
    options: ['Latitude', 'Longitude', 'Altitude', 'Parallels'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'World Geography',
    type: 'multiple-choice',
    explanation: 'Lines of Longitude (meridians) run north-south between the poles.'
  },
  {
    id: 'geo-04',
    question: 'Which hemisphere contains the greatest amount of Earth’s total land area?',
    options: ['Northern Hemisphere', 'Southern Hemisphere'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'World Geography',
    type: 'multiple-choice',
    explanation: 'About 68% of the world’s landmass is located in the Northern Hemisphere.'
  },
  {
    id: 'geo-05',
    question: 'What is the line of latitude located approximately 23.5 degrees North called?',
    options: ['Tropic of Capricorn', 'Tropic of Cancer', 'Arctic Circle', 'Equator'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'World Geography',
    type: 'multiple-choice',
    explanation: 'The Tropic of Cancer is at ~23.5° N, marking the most northerly latitude where the Sun can be directly overhead.'
  },
  {
    id: 'geo-06',
    question: 'The International Date Line roughly follows which meridian of longitude across the Pacific?',
    options: ['0 degrees', '90 degrees', '180 degrees', '360 degrees'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'World Geography',
    type: 'multiple-choice',
    explanation: 'The International Date Line sits approximately along the 180° meridian in the Pacific Ocean.'
  },
  {
    id: 'geo-07',
    question: 'A narrow strip of water connecting two larger bodies of water is known as a:',
    options: ['Peninsula', 'Isthmus', 'Strait', 'Delta'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'World Geography',
    type: 'multiple-choice',
    explanation: 'A strait is a narrow channel of water joining two larger seas or oceans (like the Strait of Gibraltar).'
  },
  {
    id: 'geo-08',
    question: 'A narrow piece of land connecting two larger land masses with water on both sides is an:',
    options: ['Isthmus', 'Archipelago', 'Plateau', 'Fjord'],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'World Geography',
    type: 'multiple-choice',
    explanation: 'An isthmus connects two landmasses, such as the Isthmus of Panama connecting North and South America.'
  },
  {
    id: 'geo-09',
    question: 'A group or chain of islands clustered together in an ocean is called an:',
    options: ['Atoll', 'Archipelago', 'Lagoon', 'Canyon'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'World Geography',
    type: 'multiple-choice',
    explanation: 'Hawaii, Indonesia, and Japan are famous examples of archipelagos.'
  },
  {
    id: 'geo-10',
    question: 'True or False: The North Pole is situated on a continental landmass covered by ice.',
    options: ['True', 'False'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'World Geography',
    type: 'true-false',
    explanation: 'False! The North Pole sits on drifting sea ice atop the Arctic Ocean, unlike the South Pole which sits on the continent of Antarctica.'
  },

  // ----------------------------------------------------
  // GEOGRAPHIC FEATURES & LANDFORMS (53-60)
  // ----------------------------------------------------
  {
    id: 'feat-01',
    question: 'Which river is traditionally considered the longest river on Earth?',
    options: ['Amazon River', 'Nile River', 'Mississippi River', 'Yangtze River'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Nile River in Africa flows northward for approximately 6,650 km (4,132 miles).'
  },
  {
    id: 'feat-02',
    question: 'Which river carries the greatest volume of water into the ocean of any river on Earth?',
    options: ['Amazon River', 'Congo River', 'Danube River', 'Ganges River'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Amazon discharges roughly 20% of the world’s total river flow into the Atlantic Ocean!'
  },
  {
    id: 'feat-03',
    question: 'The highest waterfall in the world, Angel Falls, drops from a tabletop mountain in which continent?',
    options: ['South America (Venezuela)', 'North America (Canada)', 'Africa (Zambia)', 'Asia (India)'],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'Angel Falls plunges 979 meters (3,212 feet) down in Venezuela, South America.'
  },
  {
    id: 'feat-04',
    question: 'Which is the largest freshwater lake by surface area in the world?',
    options: ['Lake Victoria', 'Lake Superior', 'Lake Baikal', 'Caspian Sea'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'Lake Superior in North America is the largest freshwater lake by surface area (Lake Baikal is deepest by volume).'
  },
  {
    id: 'feat-05',
    question: 'The famous Grand Canyon was carved over millions of years by which river?',
    options: ['Colorado River', 'Rio Grande', 'Hudson River', 'Columbia River'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Colorado River carved the iconic steep-sided Grand Canyon in Arizona, North America.'
  },
  {
    id: 'feat-06',
    question: 'The Alps mountain range is situated primarily within which continent?',
    options: ['Europe', 'Asia', 'South America', 'North America'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Alps span across eight European countries, including Switzerland, France, Italy, and Austria.'
  },
  {
    id: 'feat-07',
    question: 'Which body of water is the saltiest natural sea/lake on Earth where humans can easily float?',
    options: ['Dead Sea', 'Red Sea', 'Caspian Sea', 'Mediterranean Sea'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Dead Sea’s hypersaline waters make its density high enough that swimmers float effortlessly.'
  },
  {
    id: 'feat-08',
    question: 'The vast frozen plain biome found across the far northern regions of Canada, Russia, and Alaska is called:',
    options: ['Savanna', 'Tundra', 'Rainforest', 'Pampas'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Arctic Tundra features permafrost and low-growing vegetation adapted to extreme cold.'
  },
  {
    id: 'feat-09',
    question: 'Which narrow body of water separates the continents of Asia and North America?',
    options: ['Bering Strait', 'Strait of Gibraltar', 'Strait of Malacca', 'Cook Strait'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Bering Strait connects the Arctic Ocean with the Bering Sea and separates Russia from Alaska.'
  },
  {
    id: 'feat-10',
    question: 'What is the longest river in Asia and third-longest in the world?',
    options: ['Yellow River', 'Yangtze River', 'Mekong River', 'Indus River'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Yangtze River in China spans approximately 6,300 km (3,915 mi).'
  },
  {
    id: 'feat-11',
    question: 'The historic Suez Canal connects the Mediterranean Sea to which body of water?',
    options: ['Red Sea', 'Black Sea', 'Persian Gulf', 'Arabian Sea'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'Opened in 1869, the Suez Canal in Egypt connects the Mediterranean Sea directly to the Red Sea.'
  },
  {
    id: 'feat-12',
    question: 'Which famous artificial waterway connects the Atlantic and Pacific Oceans?',
    options: ['Kiel Canal', 'Suez Canal', 'Panama Canal', 'Erie Canal'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Panama Canal cuts across the Isthmus of Panama to connect the Atlantic and Pacific Oceans.'
  },
  {
    id: 'feat-13',
    question: 'Which major sea is located between Southern Europe and Northern Africa?',
    options: ['Baltic Sea', 'Mediterranean Sea', 'North Sea', 'Coral Sea'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Mediterranean Sea is an almost completely enclosed sea bordered by Europe, Africa, and Asia.'
  },
  {
    id: 'feat-14',
    question: 'What is the highest mountain peak on the African continent?',
    options: ['Mount Kenya', 'Mount Kilimanjaro', 'Mount Stanley', 'Atlas Peak'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'Mount Kilimanjaro in Tanzania rises to 5,895 meters (19,341 feet) above sea level.'
  },
  {
    id: 'feat-15',
    question: 'Which desert covers most of Northern Africa and is the largest hot desert on Earth?',
    options: ['Kalahari Desert', 'Namib Desert', 'Sahara Desert', 'Mojave Desert'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Sahara Desert spans across 11 North African countries, covering about 9.2 million km².'
  },
  {
    id: 'feat-16',
    question: 'Which lake in Siberia, Russia is the deepest and oldest freshwater lake in the world?',
    options: ['Lake Baikal', 'Lake Superior', 'Lake Victoria', 'Lake Michigan'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'Lake Baikal holds about 20% of the world’s unfrozen freshwater and reaches a depth of 1,642 meters.'
  },
  {
    id: 'feat-17',
    question: 'The iconic symmetrical volcanic mountain Mount Fuji is located in which island nation?',
    options: ['South Korea', 'Japan', 'Philippines', 'Indonesia'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'Mount Fuji is an active stratovolcano and the highest peak in Japan on Honshu island.'
  },
  {
    id: 'feat-18',
    question: 'Which strait separates Spain in Europe from Morocco in Africa?',
    options: ['Strait of Hormuz', 'Strait of Gibraltar', 'Bosporus Strait', 'Dardanelles'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Strait of Gibraltar connects the Atlantic Ocean to the Mediterranean Sea and is only 14 km wide at its narrowest.'
  },
  {
    id: 'feat-19',
    question: 'The breathtaking Victoria Falls is situated on which great African river?',
    options: ['Nile River', 'Congo River', 'Zambezi River', 'Niger River'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'Victoria Falls is on the Zambezi River along the border of Zambia and Zimbabwe.'
  },
  {
    id: 'feat-20',
    question: 'Which large cold desert spans parts of Northern China and Southern Mongolia?',
    options: ['Atacama Desert', 'Gobi Desert', 'Arabian Desert', 'Sonoran Desert'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Gobi Desert is known for its extreme continental climate and rich fossil deposits.'
  },
  {
    id: 'feat-21',
    question: 'Which famous river flows right through the capital city of London in the United Kingdom?',
    options: ['River Seine', 'River Danube', 'River Thames', 'River Rhine'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The River Thames flows 346 km through southern England, including Greater London.'
  },
  {
    id: 'feat-22',
    question: 'Which coastal strip in Chile is recognized as the driest non-polar desert on Earth?',
    options: ['Atacama Desert', 'Patagonian Desert', 'Mojave Desert', 'Kalahari Desert'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'Some weather stations in the Atacama Desert have never recorded a single drop of rainfall.'
  },
  {
    id: 'feat-23',
    question: 'The Ural Mountains form the traditional natural boundary between which two continents?',
    options: ['Europe and Asia', 'Asia and Africa', 'North and South America', 'Europe and Africa'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Ural Mountains run north-south through western Russia, dividing Europe and Asia.'
  },
  {
    id: 'feat-24',
    question: 'Which body of water is situated between Iran and the Arabian Peninsula?',
    options: ['Red Sea', 'Persian Gulf', 'Bay of Bengal', 'Caspian Sea'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The Persian Gulf is a Mediterranean sea in Western Asia and a vital world trade waterway.'
  },
  {
    id: 'feat-25',
    question: 'The Great Rift Valley is a massive geological trench running down which continent?',
    options: ['Asia', 'Africa', 'South America', 'Australia'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Geographic Features',
    type: 'multiple-choice',
    explanation: 'The East African Rift Valley is where the African tectonic plate is actively splitting into two.'
  },
  {
    id: 'ocean-16',
    question: 'Which unique sea has no land boundaries and is defined solely by ocean currents in the Atlantic?',
    options: ['Sargasso Sea', 'Baltic Sea', 'Adriatic Sea', 'Tasman Sea'],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Sargasso Sea is bounded by four ocean currents forming the North Atlantic Gyre.'
  },
  {
    id: 'ocean-17',
    question: 'The Great Barrier Reef, the largest coral reef system on Earth, is located in which sea?',
    options: ['Tasman Sea', 'Coral Sea', 'South China Sea', 'Arabian Sea'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Coral Sea lies off the northeast coast of Queensland, Australia.'
  },
  {
    id: 'ocean-18',
    question: 'Which ocean is recognized as having the warmest average surface water temperatures?',
    options: ['Indian Ocean', 'Arctic Ocean', 'Atlantic Ocean', 'Southern Ocean'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Indian Ocean’s tropical location gives it the warmest surface temperatures among Earth’s major oceans.'
  },
  {
    id: 'ocean-19',
    question: 'Which narrow strait separates the island of Great Britain from mainland France?',
    options: ['Strait of Dover (English Channel)', 'Bering Strait', 'Cook Strait', 'Strait of Messina'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The Strait of Dover connects the English Channel with the North Sea.'
  },
  {
    id: 'ocean-20',
    question: 'Which ocean holds more than half of all the free water on planet Earth?',
    options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Southern Ocean'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Oceans',
    type: 'multiple-choice',
    explanation: 'The immense Pacific Ocean contains more water than all other oceans combined.'
  },
  {
    id: 'cont-16',
    question: 'Which is the only continent on Earth that has zero active volcanoes?',
    options: ['Europe', 'Australia', 'South America', 'Africa'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'Australia sits securely in the middle of the Indo-Australian tectonic plate with no active volcanic activity on its mainland.'
  },
  {
    id: 'cont-17',
    question: 'Which continent has the highest average elevation of any continent on Earth?',
    options: ['Asia', 'Antarctica', 'South America', 'North America'],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'Because of its massive 2-kilometer thick ice sheet, Antarctica has an average elevation of 2,300 meters above sea level.'
  },
  {
    id: 'cont-18',
    question: 'Which continent has the greatest number of individual sovereign countries (54 nations)?',
    options: ['Asia', 'Africa', 'Europe', 'North America'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'Africa contains 54 fully recognized UN member states, more than any other continent.'
  },
  {
    id: 'cont-19',
    question: 'Which continent is also entirely governed as a single country?',
    options: ['Australia', 'Antarctica', 'South America', 'Europe'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'The Commonwealth of Australia encompasses the entire mainland continent of Australia.'
  },
  {
    id: 'cont-20',
    question: 'Which continent contains the Amazon Rainforest, the largest tropical rainforest on Earth?',
    options: ['Africa', 'Asia', 'South America', 'North America'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Continents',
    type: 'multiple-choice',
    explanation: 'The Amazon Basin spans across nine South American nations, primarily Brazil.'
  },
  {
    id: 'cntry-11',
    question: 'In which continent is the nation of Argentina located?',
    options: ['Europe', 'South America', 'North America', 'Africa'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Countries and Continents',
    type: 'multiple-choice',
    explanation: 'Argentina is the second-largest country in South America, known for the Pampas and Andes mountains.'
  },
  {
    id: 'cntry-12',
    question: 'In which continent is the country of Kenya located?',
    options: ['Asia', 'Africa', 'South America', 'Europe'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Countries and Continents',
    type: 'multiple-choice',
    explanation: 'Kenya is located in East Africa, with its coastline on the Indian Ocean.'
  },
  {
    id: 'cntry-13',
    question: 'In which continent is the country of Germany located?',
    options: ['Europe', 'Asia', 'North America', 'Australia'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Countries and Continents',
    type: 'multiple-choice',
    explanation: 'Germany is a major nation located in Central Europe.'
  },
  {
    id: 'cntry-14',
    question: 'In which continent is Thailand located?',
    options: ['Africa', 'Asia', 'South America', 'Oceania'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Countries and Continents',
    type: 'multiple-choice',
    explanation: 'Thailand is situated in Southeast Asia on the Indochinese Peninsula.'
  },
  {
    id: 'cntry-15',
    question: 'In which continent is Canada located?',
    options: ['Europe', 'North America', 'South America', 'Asia'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Countries and Continents',
    type: 'multiple-choice',
    explanation: 'Canada occupies the northern portion of the North American continent.'
  },
  {
    id: 'cntry-16',
    question: 'In which continent is the historic nation of Egypt primarily located?',
    options: ['Africa', 'Asia', 'Europe', 'South America'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Countries and Continents',
    type: 'multiple-choice',
    explanation: 'Egypt is located in Northeast Africa (with the Sinai Peninsula extending into Western Asia).'
  },
  {
    id: 'cntry-17',
    question: 'New Zealand is an island nation situated within which geographic region/continent?',
    options: ['Oceania', 'Asia', 'South America', 'Africa'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Countries and Continents',
    type: 'multiple-choice',
    explanation: 'New Zealand consists of two main islands (North and South Island) in the southwestern Pacific Ocean in Oceania.'
  },
  {
    id: 'cntry-18',
    question: 'In which continent is Norway located?',
    options: ['North America', 'Europe', 'Asia', 'Antarctica'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Countries and Continents',
    type: 'multiple-choice',
    explanation: 'Norway occupies the western portion of the Scandinavian Peninsula in Northern Europe.'
  },
  {
    id: 'cntry-19',
    question: 'In which continent is Peru, home of the ancient city Machu Picchu, located?',
    options: ['South America', 'North America', 'Africa', 'Europe'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Countries and Continents',
    type: 'multiple-choice',
    explanation: 'Peru is located in western South America along the Pacific Ocean and Andes Mountains.'
  },
  {
    id: 'cntry-20',
    question: 'In which continent is India located?',
    options: ['Africa', 'Asia', 'Europe', 'Australia'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Countries and Continents',
    type: 'multiple-choice',
    explanation: 'India is located in South Asia and is bounded by the Indian Ocean on the south.'
  },
  {
    id: 'geo-11',
    question: 'What is the imaginary line of 0° Longitude that passes through Greenwich, England called?',
    options: ['Equator', 'Prime Meridian', 'International Date Line', 'Tropic of Cancer'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'World Geography',
    type: 'multiple-choice',
    explanation: 'The Prime Meridian divides Earth into the Eastern and Western Hemispheres at 0° longitude.'
  },
  {
    id: 'geo-12',
    question: 'What is the geographic term for a narrow strip of land connecting two larger land masses?',
    options: ['Peninsula', 'Isthmus', 'Archipelago', 'Strait'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'World Geography',
    type: 'multiple-choice',
    explanation: 'An isthmus (like the Isthmus of Panama) connects two larger land areas with water on both sides.'
  },
  {
    id: 'geo-13',
    question: 'What do we call a piece of land almost completely surrounded by water on three sides?',
    options: ['Island', 'Peninsula', 'Plateau', 'Atoll'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'World Geography',
    type: 'multiple-choice',
    explanation: 'A peninsula (such as the Florida, Iberian, or Arabian Peninsula) projects into a body of water.'
  }
];

export const TOTAL_QUESTIONS_COUNT = QUESTIONS_BANK.length;
