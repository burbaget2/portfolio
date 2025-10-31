export interface ProjectImage {
  src: string
  alt: string
  description?: string
}

export interface Project {
  id: string
  slug: string
  title: string
  client?: string
  agency?: string
  role?: string
  category: string[]
  description: string
  longDescription?: string
  thumbnail: string
  images: ProjectImage[]
  tags: string[]
  achievements?: string[]
  externalLinks?: {
    label: string
    url: string
  }[]
  year?: string
  award?: string
}

export const projects: Project[] = [
  {
    id: 'data-viz-dashboards',
    slug: 'data-visualization-for-businesses',
    title: 'Data Visualization for Businesses',
    client: 'Plotly Studio / iQmetrix',
    role: 'UX Designer',
    category: ['Data Visualization', 'Dashboard Design', 'Enterprise'],
    description: 'Redesigned sales performance dashboards for the dominant point-of-sale system in the wireless industry. Created a modular, web-based, fully mobile-friendly, customizable dashboarding system.',
    longDescription: `I was tasked with redesigning the sales performance dashboards used in the dominant point-of-sale system in the wireless industry.

We began by conducting interviews with customers to understand what they found useful or not useful in their current dashboard. Each customer had unique preferences; for some, certain metrics were indispensable, while others prioritized different ones. Interestingly, many interviewees admitted to disregarding certain parts of the dashboard altogether.

Based on this feedback, I developed a modular, web-based, fully mobile-friendly, customizable dashboarding system. Users have the flexibility to add and configure metrics they prioritize using a combination of configurable cards. These cards can be tailored in size and viewed as charts, lists, or even maps, offering a multitude of ways to visualize the same data according to a retailer's specific requirements.

This system enables businesses to create and share targeted dashboards to monitor their operations and influence employee behaviour.`,
    thumbnail: '/images/projects/data-viz/image-2.png',
    images: [
      {
        src: '/images/projects/data-viz/image-2.png',
        alt: 'Configured Custom Dashboard',
        description: 'Example of a fully configured dashboard where a business has set up a variety of ways of consuming data'
      },
      {
        src: '/images/projects/data-viz/image-3.png',
        alt: 'Dashboard List',
        description: 'A list of custom created dashboards that can be shared and reviewed at any time'
      },
      {
        src: '/images/projects/data-viz/image-4.png',
        alt: 'Adding Metrics Card to a Dashboard',
        description: 'Screen where the user chooses the type of metrics card to add to a dashboard'
      },
      {
        src: '/images/projects/data-viz/image-5.png',
        alt: 'Dashboard Management',
        description: 'Example of a dashboard management task'
      },
    ],
    tags: ['UX Research', 'Dashboard Design', 'Data Visualization', 'Mobile-First', 'Customization'],
    achievements: [
      'Information is Beautiful Candidate',
      'Modular dashboard system',
      'Fully mobile-friendly',
      'Customizable metrics cards',
      'Multiple visualization options'
    ],
    externalLinks: [
      {
        label: 'Information is Beautiful Showcase',
        url: 'https://www.informationisbeautifulawards.com/showcase/1067-iqmetrix-hub-analytics'
      }
    ],
    award: 'Information is Beautiful Candidate'
  },
  {
    id: 'iqmetrix-retail',
    slug: 'iqmetrix-retail-platform',
    title: 'iQmetrix - Front and Back of House Retail Platform',
    client: 'iQmetrix',
    role: 'Lead Designer',
    category: ['Retail Systems', 'Point of Sale', 'Inventory Management'],
    description: 'Tablet-based, touchscreen, fully mobile Retail Point of Sale System serving as a comprehensive solution for retailers to manage day-to-day operations, covering sales, orders, customer queues, and inventory management.',
    longDescription: `As the Lead Designer at iQmetrix, I spearheaded the development of a tablet-based, touchscreen, fully mobile Retail Point of Sale System. This elegant system serves as a comprehensive solution for retailers to manage their day-to-day operations, covering everything from sales and orders to customer queues and inventory management. It boasts a visually stunning interface and user-friendly experience. Currently, it is being deployed in hundreds of stores, complemented by a robust web-based backend system for driving and reporting on retail operations.

Additionally, I played a key role in the design of the back-of-house inventory management system and retail operations tool, contributing to the holistic improvement of the retail experience.`,
    thumbnail: '/images/projects/iqmetrix/image-7.png',
    images: [
      {
        src: '/images/projects/iqmetrix/image-6.png',
        alt: 'Online Inventory Management',
        description: 'Centralized experience that syncs product information and stock numbers between back of house, and point of sale.'
      },
      {
        src: '/images/projects/iqmetrix/image-7.png',
        alt: 'Point of Sale Employee Experience',
        description: 'The service view of inventory and sales actions on tablet.'
      },
      {
        src: '/images/projects/iqmetrix/image-8.png',
        alt: 'Customer Targeted Suggestions',
        description: 'Employee can suggest product offerings based on customer history and preferences'
      },
      {
        src: '/images/projects/iqmetrix/image-9.png',
        alt: 'Loyalty',
        description: 'Employees can see customer loyalty accumulation, and suggest redemption'
      },
      {
        src: '/images/projects/iqmetrix/image-10.png',
        alt: 'Invoice Management',
        description: 'Customer history can be retrieved for returns and verification at the point of sale and also in the back of house system'
      },
      {
        src: '/images/projects/iqmetrix/image-31.png',
        alt: 'Browse Catalog Bulk',
        description: 'Inventory browsing interface'
      },
      {
        src: '/images/projects/iqmetrix/image-33.png',
        alt: 'POS Interface',
        description: 'Point of sale interface detail'
      },
      {
        src: '/images/projects/iqmetrix/image-34.png',
        alt: 'POS Interface Detail',
        description: 'Additional point of sale interface'
      },
    ],
    tags: ['UX Design', 'UI Design', 'Mobile Design', 'Retail Systems', 'Inventory Management', 'Touchscreen'],
    achievements: [
      'Deployed in hundreds of stores',
      'Tablet-based touchscreen system',
      'Fully mobile-friendly',
      'Comprehensive retail operations solution'
    ]
  },
  {
    id: 'navarik',
    slug: 'navarik-shipping',
    title: 'Navarik - Digital Transformation in the Shipping Industry',
    client: 'Navarik',
    role: 'Sole UX Designer',
    category: ['Enterprise Software', 'Shipping/Logistics', 'Data Management'],
    description: 'Web applications utilized by some of the largest commodity companies globally, including BP, Petro Canada, and Shell. Designed intricate, extensive, and precise flows for safely moving commodities.',
    longDescription: `During my tenure at Navarik, I served as the sole UX designer responsible for designing the flows for Navarik products. These web applications were utilized by some of the largest commodity companies globally, including BP, Petro Canada, and Shell. Given Navarik's dedication to delivering data and flows that enable companies to safely and punctually move commodities, the flows I worked on were intricate, extensive, and precise.

Whether it involved the nomination of vessels for safely transporting millions of barrels of oil or the flows facilitating inspectors in logging and recording inspection results, these workflows were of utmost importance. I take great pride in the work I accomplished during this time.

The screens were not crafted for aesthetic appeal; rather, they were designed to be clinical, data-heavy, and efficient interfaces for navigating incredibly complex operations.`,
    thumbnail: '/images/projects/navarik/image-11.png',
    images: [
      {
        src: '/images/projects/navarik/image-11.png',
        alt: 'Navarik Inspection Interface',
        description: 'Inspection workflow interface'
      },
      {
        src: '/images/projects/navarik/image-12.png',
        alt: 'Navarik Interface',
        description: 'Navarik product interface'
      },
    ],
    tags: ['UX Design', 'Enterprise', 'Data-Heavy Interfaces', 'Workflow Design', 'Shipping'],
    achievements: [
      'Clients: BP, Petro Canada, Shell',
      'Complex commodity shipping workflows',
      'Vessel nomination systems',
      'Inspection logging systems'
    ],
    externalLinks: [
      {
        label: 'Navarik Inspection Demo Video',
        url: 'https://vimeo.com/122460796'
      }
    ]
  },
  {
    id: 'ea-games',
    slug: 'ea-games-intelligence',
    title: 'EA Games Intelligence Tool',
    client: 'EA Games',
    role: 'Creative Director / Interaction Architect',
    category: ['Gaming', 'Interactive Web', 'Marketing'],
    description: 'Creative Direction and Interaction Architecture for EA games websites, including Godfather, Need for Speed, and Battlefield. Key achievement was the redesign and interaction architecture for EA Battlefield 2 website, and design of industry first online game viewer and intelligence tool.',
    longDescription: `Creative Direction and Interaction Architecture for EA games websites. Including Godfather, Need for Speed, and Battlefield. I worked with client to improve and deliver first class User Experience and also meet EA's marketing objectives. Interface design and conceptual development.

**Key achievement** was the redesign and interaction architecture for EA Battlefield 2 website, and design of industry first online game viewer and intelligence tool.

This allowed users playing the game to log into the site after they had played, and use an intelligence tool to plan with their clan their next strategies when they play again. So cool.`,
    thumbnail: '/images/projects/ea-games/image-13.jpg',
    images: [
      {
        src: '/images/projects/ea-games/image-13.jpg',
        alt: 'Battlefield 2 Modern Combat',
        description: 'Battlefield 2 game interface'
      },
      {
        src: '/images/projects/ea-games/image-14.png',
        alt: 'EA Games Interface',
        description: 'EA Games website interface'
      },
      {
        src: '/images/projects/ea-games/image-35.jpg',
        alt: 'Battlefield 2',
        description: 'Battlefield 2 game'
      },
    ],
    tags: ['UX Design', 'Interaction Design', 'Gaming', 'Marketing', 'Innovation'],
    achievements: [
      'Industry first online game viewer and intelligence tool',
      'EA Battlefield 2 website redesign',
      'Godfather, Need for Speed projects'
    ],
    externalLinks: [
      {
        label: 'Read IGN review of Game Viewer and Intelligence Tool',
        url: 'http://ca.ign.com/articles/2005/11/05/battlefield-2s-modern-strategy'
      }
    ]
  },
  {
    id: 'peugeot',
    slug: 'peugeot-award-winning',
    title: 'Award Winning Peugeot 407, and 1007 Sites',
    client: 'Peugeot',
    agency: 'HAVAS (London)',
    role: 'Accessibility Champion / UX Designer',
    category: ['Automotive Marketing', 'Accessibility', 'Flash Development'],
    description: 'Digital marketing campaigns for Peugeot car company. The 1007 model website was the first marketing website to be fully accessible despite Flash being predominant, winning a Cannes Lion award.',
    longDescription: `Whilst in London, working for HAVAS, I was part of a team that delivered digital marketing campaigns for the Peugeot car company. These were the 107, and 1007 models.

**1007:** This model was a new development at the time. It was a vehicle tailored to urban lifestyles. It also was targeted to users with mobility challenges.

On this project, I worked more as an accessibility champion, than pure UX. Because flash was predominant at the time, the company wanted a dynamic website, but also one that has accessibility features.

I worked along with the design team to make the first marketing website, to be fully accessible. the navigation, text, and rich media playing for all users, there was also an invisible layer underneath that allowed users with visibility issues to access the site, with spoken word readers, and accessible HTML.

This website ended up winning a Cannes Lion.

**107**

I worked on the navigation flow, and html templates along with the design and development teams.`,
    thumbnail: '/images/projects/peugeot/image-15.png',
    images: [
      {
        src: '/images/projects/peugeot/image-15.png',
        alt: 'Peugeot Site Screenshot',
        description: 'Peugeot website interface'
      },
      {
        src: '/images/projects/peugeot/image-16.png',
        alt: 'Peugeot Site Screenshot',
        description: 'Peugeot website interface'
      },
      {
        src: '/images/projects/peugeot/image-17.png',
        alt: 'Peugeot Site Screenshot',
        description: 'Peugeot website interface'
      },
      {
        src: '/images/projects/peugeot/image-18.png',
        alt: 'Peugeot Site Screenshot',
        description: 'Peugeot website interface'
      },
      {
        src: '/images/projects/peugeot/image-37.png',
        alt: 'Peugeot Site',
        description: 'Peugeot website'
      },
    ],
    tags: ['UX Design', 'Accessibility', 'Flash Development', 'Marketing', 'Award Winner'],
    achievements: [
      'Cannes Lion Award Winner',
      'First fully accessible Flash marketing website',
      'Invisible accessibility layer for screen readers',
      'Navigation flow and HTML templates'
    ],
    award: 'Cannes Lion'
  },
  {
    id: 'bodog',
    slug: 'bodog-com-net',
    title: 'BODOG.COM & .NET',
    client: 'Bodog',
    agency: 'Riptown Media',
    role: 'Site Producer',
    category: ['Web Design', 'Site Production', 'UX'],
    description: 'Fast-moving project to roll out redesigns of the .com and .net websites. Managed design team resources, created wireframes, tested and vetted with stakeholders and development teams.',
    longDescription: `I worked briefly for the Riptown Media agency to act as Site Producer. My role was to roll out the redesigns of the .com, and .net website.

It was a fast moving, dynamic time. My role was to manage the design team resources (developers, designers, database resources). My mandate was to role out the redesigns of the new websites, manage the teams and resources, report to the execs, and drive features out the door.

I started of the design process calling on my skills in UX. Creating wireframes, testing, and vetting with stakeholders and development teams.

In the end, the two websites, and customer account experience was delivered.`,
    thumbnail: '/images/projects/bodog/image-19.jpg',
    images: [
      {
        src: '/images/projects/bodog/image-19.jpg',
        alt: 'Bodog Homepage',
        description: 'Bodog.com homepage design'
      },
      {
        src: '/images/projects/bodog/image-20.jpg',
        alt: 'Bodog .net Homepage',
        description: 'Bodog.net homepage final design'
      },
      {
        src: '/images/projects/bodog/image-38.jpg',
        alt: 'Bodog Site',
        description: 'Bodog website'
      },
    ],
    tags: ['UX Design', 'Wireframing', 'Project Management', 'Web Design'],
    achievements: [
      'Two website redesigns delivered',
      'Customer account experience',
      'Managed design team resources',
      'Wireframes and testing'
    ]
  },
  {
    id: 'intel',
    slug: 'intel-emea-cms',
    title: 'Intel EMEA Websites and Content Management',
    client: 'Intel',
    agency: 'HAVAS (London)',
    role: 'UX Designer / CMS Architect',
    category: ['Enterprise CMS', 'Content Strategy', 'Template Systems'],
    description: 'Solved a large problem where Intel needed content control but design was managed by agency. Separated presentation layer from users, created data capture forms for marketing content publishing via CMS.',
    longDescription: `Whilst in London, working for HAVAS, I was brought onto the Intel team to help solve a large problem.

Because the website was designed by our agency, Intel had to rely on the agency to update content on the site. Intel wanted control of the website content, but the design was to be managed by the agency.

I was brought on to break down all the different designs into presentation templates. the presentation layer would be separated from the users, and data capture forms were made so that they could enter marketing content, and then publish it to the website. This was all done on a chosen CMS.

Every website permutation had to be taken in account, and design components needed for all the needed use cases.

This was all completed after a lot of late nights, and hard work, but the result saved and immense amount of back and forth between Intel, and the agency.`,
    thumbnail: '/images/projects/intel/image-21.png',
    images: [
      {
        src: '/images/projects/intel/image-21.png',
        alt: 'Intel CMS Interface',
        description: 'Intel content management system interface'
      },
      {
        src: '/images/projects/intel/image-39.png',
        alt: 'Intel CMS',
        description: 'Intel CMS interface'
      },
    ],
    tags: ['CMS Design', 'Content Strategy', 'Template Systems', 'Enterprise'],
    achievements: [
      'Separated presentation from content',
      'Data capture forms for marketing',
      'Saved immense back-and-forth between Intel and agency',
      'All website permutations accounted for'
    ]
  },
  {
    id: 'ebookers',
    slug: 'ebookers-holiday-booking',
    title: 'Ebookers - Major European Holiday Booking Company',
    client: 'Ebookers',
    role: 'Lead Web Designer',
    category: ['E-commerce', 'Travel', 'Booking Systems'],
    description: 'Early 2000s dotCOM boom project in London. Led web design for easy and intuitive booking process, reducing drop-offs and support calls. Worked on navigation, template pages for package holidays, hotels, cars, insurance, campaigns, and banner ads.',
    longDescription: `When I first moved to the UK, I started work at a company called ebookers. It was a company about to explode. It was riding on the early 2000s launch of online holiday and flight booking. Before those years, people would still go to a travel agent to book.

This was the dotCOM boom in London, and companies were trying to capitalize on both the rise of the internet, and cheap travel in Europe.

I was the lead web designer, responsible for making the booking process easy and intuitive, and to reduce drop offs, or support calls.

We monitored the usage of the booking engine, trimming the length of the process, and making the path to completion clearer an clearer.

I also worked on the general navigation, and template pages for package holidays, and all other areas of the site (hotel, car, insurance etc).

I worked with the copywriters on holiday campaigns, and also banner ads that would be bought to drive potential vacationers to the site.`,
    thumbnail: '/images/projects/ebookers/image-22.jpg',
    images: [
      {
        src: '/images/projects/ebookers/image-22.jpg',
        alt: 'Ebookers Brisbane',
        description: 'Ebookers interface'
      },
      {
        src: '/images/projects/ebookers/image-23.png',
        alt: 'Ebookers Interface',
        description: 'Ebookers booking interface screenshot'
      },
      {
        src: '/images/projects/ebookers/image-40.jpg',
        alt: 'Ebookers',
        description: 'Ebookers website'
      },
    ],
    tags: ['UX Design', 'E-commerce', 'Booking Systems', 'Conversion Optimization', 'Travel'],
    achievements: [
      'Reduced booking drop-offs',
      'Reduced support calls',
      'Trimmed booking process length',
      'Clearer path to completion',
      'Template pages for all travel services'
    ]
  },
]

