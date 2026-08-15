export default function handler(req: any, res: any) {
  const events = [
    {
      id: "upsc-nda-2027",
      title: "NDA & NA Examination (I), 2027",
      type: "exam",
      date: "2026-12-02",
      endDate: "2026-12-22",
      examDate: "2027-04-11",

      description:
        "National Defence Academy and Naval Academy Examination",

      institution: "Union Public Service Commission",

      status: "upcoming",
      priority: "high",

      requirements: [
        "Educational qualification",
        "Valid ID proof",
        "Passport size photograph",
        "Signature"
      ],

      link: "https://www.upsc.gov.in/",
      applicationLink: "https://upsconline.nic.in/",

      source: "UPSC",
      reminder: false
    },

    {
      id: "ssc-example-2026",
      title: "SSC Examination 2026-27",
      type: "exam",

      date: "2026-08-01",
      endDate: "2026-08-31",

      description:
        "Staff Selection Commission examination and recruitment opportunities",

      institution: "Staff Selection Commission",

      status: "upcoming",
      priority: "high",

      requirements: [
        "Educational certificate",
        "Valid ID proof",
        "Passport size photograph",
        "Signature"
      ],

      link: "https://ssc.gov.in/",
      applicationLink: "https://ssc.gov.in/",

      source: "SSC",
      reminder: false
    },

    {
      id: "nta-example-2026",
      title: "NTA Examination Notifications",
      type: "exam",

      date: "2026-09-01",
      endDate: "2026-09-30",

      description:
        "Upcoming examination and admission notifications published by NTA",

      institution: "National Testing Agency",

      status: "upcoming",
      priority: "medium",

      requirements: [
        "Educational certificate",
        "Valid ID proof",
        "Passport size photograph"
      ],

      link: "https://www.nta.ac.in/",
      applicationLink: "https://www.nta.ac.in/",

      source: "NTA",
      reminder: false
    }
  ];

  res.status(200).json(events);
}