export const CREATE_TABLE_ARGS: {
  name: "buildings" | "flats" | "flatTypes" | "owners";
  definition: string;
  hasForeignKey?: boolean;
}[] = [
  {
    name: "owners",
    definition:
      "ownerId INT AUTO_INCREMENT PRIMARY KEY, ownerAddress VARCHAR(255), name VARCHAR(255), birthDate DATE, email VARCHAR(255)",
  },
  {
    name: "flatTypes",
    definition:
      "flatTypeId INT AUTO_INCREMENT PRIMARY KEY, size ENUM( '1+1', '2+1', '3+1', '4+1' ) NOT NULL, rented ENUM( 'true', 'false' )",
  },
  {
    name: "buildings",
    definition:
      "buildingId INT AUTO_INCREMENT PRIMARY KEY, buildingAddress VARCHAR(255), buildDate DATE, representativeId INT, FOREIGN KEY (representativeId) REFERENCES owners(ownerId)",
    hasForeignKey: true,
  },

  {
    name: "flats",
    definition:
      "flatId INT AUTO_INCREMENT PRIMARY KEY, ownerId INT, flatTypeId INT, buildingId INT, FOREIGN KEY (ownerId) REFERENCES owners(ownerId), FOREIGN KEY (flatTypeId) REFERENCES flatTypes(flatTypeId), FOREIGN KEY (buildingId) REFERENCES buildings(buildingId)",
    hasForeignKey: true,
  },
];

export const POPULATE_TABLES_ARGS: Record<
  "buildings" | "flats" | "flatTypes" | "owners",
  {
    sql: string;
    data: Array<Array<unknown>>;
  }
> = {
  buildings: {
    sql: "INSERT INTO buildings (buildingAddress, buildDate, representativeId) VALUES ?",
    data: [
      ["Ap #485-9519 Sed Rd.", "Jan 21, 2002", 1],
      ["P.O. Box 272, 3580 Cursus Rd.", "Oct 11, 1999", 15],
      ["507-4224 Ultrices Ave", "Oct 3, 2003", 40],
    ].map((arr: Array<string | number>) => {
      const copyOfArr = [...arr];
      copyOfArr[1] = new Date(arr[2]).toISOString().split("T")[0];
      return copyOfArr;
    }),
  },
  flatTypes: {
    sql: "INSERT INTO flatTypes (size, rented) VALUES ?",
    data: [
      ["1+1", "true"],
      ["2+1", "true"],
      ["3+1", "true"],
      ["4+1", "true"],
      ["1+1", "false"],
      ["2+1", "false"],
      ["3+1", "false"],
      ["4+1", "false"],
    ],
  },
  flats: {
    sql: "INSERT INTO flats (ownerId, flatTypeId, buildingId) VALUES ?",
    data: [
      [1, 7, 1],
      [15, 8, 2],
      [40, 6, 3],
      ...Array.from(Array(40).keys())
        .filter((i) => {
          const item = i + 1;
          return item !== 1 && item !== 15 && item !== 40;
        })
        .map((filteredItem) => {
          return [
            filteredItem + 1,
            Math.floor(Math.random() * 8) + 1,
            Math.floor(Math.random() * 3) + 1,
          ];
        })
        .reverse(),
    ],
  },
  owners: {
    sql: "INSERT INTO owners (ownerAddress, name, birthDate, email) VALUES ?",
    data: [
      [
        "Ap #485-9519 Sed Rd.",
        "Freya Huber",
        "Oct 11, 1999",
        "urna.nunc@hotmail.couk",
      ],
      ["844-794 Amet, St.", "Laura Goff", "Sep 9, 1979", "consequat@aol.edu"],
      [
        "507-4224 Ultrices Ave",
        "Porter Foley",
        "Oct 30, 1962",
        "quisque.fringilla@icloud.couk",
      ],
      [
        "590-1445 Et, Av.",
        "Wyoming Larsen",
        "Sep 13, 1969",
        "posuere@aol.couk",
      ],
      [
        "Ap #969-1842 Tincidunt Ave",
        "Gloria Hunter",
        "Jan 28, 1963",
        "lacus.ut@outlook.com",
      ],
      [
        "P.O. Box 272, 3580 Cursus Rd.",
        "Elton Harmon",
        "Sep 16, 1987",
        "at.fringilla@protonmail.net",
      ],
      ["8638 Neque. Rd.", "Keaton Jacobson", "Jun 17, 1966", "id@aol.com"],
      [
        "1436 Laoreet Rd.",
        "Jeanette Levy",
        "Aug 30, 1983",
        "aliquam.auctor@aol.couk",
      ],
      [
        "P.O. Box 554, 4820 Parturient Av.",
        "Dane Lancaster",
        "Jun 22, 1977",
        "mauris.vel@protonmail.edu",
      ],
      [
        "7163 Enim Street",
        "Baxter Blanchard",
        "Jun 12, 1998",
        "suspendisse@hotmail.net",
      ],
      [
        "Ap #141-6279 Lorem St.",
        "Meghan Skinner",
        "Sep 12, 1970",
        "nulla.integer.urna@hotmail.net",
      ],
      [
        "499-2436 Nisi. Street",
        "Desiree Haynes",
        "Jan 19, 1983",
        "diam@outlook.ca",
      ],
      [
        "890-3406 Ipsum Street",
        "Venus Humphrey",
        "Dec 24, 1961",
        "vitae@hotmail.couk",
      ],
      [
        "P.O. Box 328, 2804 Magna Rd.",
        "Stacey Jarvis",
        "Jul 25, 1985",
        "dolor.quisque.tincidunt@protonmail.net",
      ],
      [
        "951-8268 Sed Rd.",
        "Imelda Eaton",
        "Jun 2, 1969",
        "donec.non@icloud.com",
      ],
      [
        "823-1163 Sagittis St.",
        "Griffith Lynn",
        "Apr 8, 1996",
        "lorem.ipsum@yahoo.com",
      ],
      [
        "717-4362 Tristique Rd.",
        "Reece Leblanc",
        "Jun 4, 1980",
        "ullamcorper.duis.at@protonmail.net",
      ],
      [
        "863-7976 Arcu. Rd.",
        "Rudyard Graves",
        "May 18, 1996",
        "amet.massa.quisque@yahoo.net",
      ],
      [
        "5803 Dis Ave",
        "Sade Hubbard",
        "Dec 23, 1981",
        "augue.scelerisque@aol.ca",
      ],
      [
        "Ap #167-9440 Lectus St.",
        "Seth Sanders",
        "Aug 11, 1998",
        "at.nisi.cum@outlook.com",
      ],
      [
        "P.O. Box 135, 6925 Feugiat Av.",
        "Dustin Banks",
        "Oct 24, 1979",
        "quisque.tincidunt.pede@protonmail.edu",
      ],
      [
        "P.O. Box 949, 912 Sapien Ave",
        "Macon Tyler",
        "Jun 20, 1992",
        "enim.nunc@yahoo.edu",
      ],
      [
        "Ap #524-185 Amet, St.",
        "Herrod Davidson",
        "Mar 27, 1971",
        "id.ante@aol.ca",
      ],
      [
        "6299 Orci. Street",
        "Keiko Vasquez",
        "Sep 3, 1967",
        "nostra.per@protonmail.ca",
      ],
      ["8022 Id Avenue", "Denton Larson", "Jan 26, 1973", "a.magna@aol.ca"],
      [
        "P.O. Box 215, 940 Non, St.",
        "Ahmed Mcconnell",
        "Feb 26, 1965",
        "nunc.sed@google.edu",
      ],
      [
        "Ap #436-4492 Turpis St.",
        "Fleur Fisher",
        "May 23, 1975",
        "odio.semper@outlook.edu",
      ],
      [
        "1888 Vulputate, Av.",
        "Jacqueline Velasquez",
        "Oct 25, 1982",
        "nam.porttitor@icloud.ca",
      ],
      [
        "6552 Ante Street",
        "Silas Cortez",
        "Apr 29, 1962",
        "scelerisque.mollis@hotmail.com",
      ],
      [
        "756-3221 Ultricies Avenue",
        "Emerald Parks",
        "Mar 6, 1960",
        "suspendisse.sed.dolor@outlook.edu",
      ],
      ["9478 In Rd.", "Kane Lopez", "Nov 14, 1963", "cras.sed@google.org"],
      [
        "P.O. Box 241, 9433 Mi Rd.",
        "Akeem Clements",
        "Oct 16, 1991",
        "mus@icloud.com",
      ],
      [
        "Ap #900-1143 Interdum Av.",
        "Prescott Weeks",
        "Jun 22, 1967",
        "arcu.vestibulum.ut@yahoo.ca",
      ],
      [
        "Ap #478-7852 Nam St.",
        "Barry Wolfe",
        "May 3, 1960",
        "nascetur.ridiculus.mus@google.net",
      ],
      [
        "P.O. Box 515, 9933 Fusce St.",
        "Jessica Kane",
        "Oct 24, 1973",
        "nam.ac@outlook.com",
      ],
      [
        "P.O. Box 992, 1078 Vel Rd.",
        "Priscilla Klein",
        "Nov 10, 1971",
        "eu.neque@hotmail.edu",
      ],
      [
        "446-1211 Dictum. Street",
        "Sage Fitzpatrick",
        "Aug 15, 1986",
        "id.libero.donec@yahoo.edu",
      ],
      [
        "P.O. Box 508, 3451 Elit. Rd.",
        "Dillon Ward",
        "Nov 21, 1985",
        "pretium.neque@yahoo.com",
      ],
      [
        "878-7010 Ultrices Av.",
        "Calvin Gregory",
        "Jul 12, 1989",
        "magna.cras@icloud.net",
      ],
      [
        "800-5377 Magnis Rd.",
        "Jordan Skinner",
        "Dec 15, 1998",
        "orci.tincidunt@outlook.couk",
      ],
    ].map((arr: Array<string | number>) => {
      const copyOfArr = [...arr];
      copyOfArr[2] = new Date(arr[2]).toISOString().split("T")[0];
      return copyOfArr;
    }),
  },
};
