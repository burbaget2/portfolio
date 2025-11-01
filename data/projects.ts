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
    id: 'plotly-studio',
    slug: 'plotly-studio',
    title: 'Plotly Studio',
    client: 'Plotly Studio',
    role: 'UX Designer',
    category: ['AI/ML', 'Data Visualization', 'Product Design'],
    description: "Plotly Studio is Plotly's new flagship AI platform built to help teams explore data, produce dashboards, and generate production-ready applications faster than ever.",
    longDescription: `Plotly Studio is Plotly's new flagship AI platform built to help teams explore data, produce dashboards, and generate production-ready applications faster than ever. I helped lead the end-to-end design for core Studio experiences, bridging product, UX, and engineering to deliver an AI-first workflow grounded in real user needs.

My focus was on transforming design into working, testable product — not static artifacts. Using tools like Claude Code and Cursor, I vibe-coded complete flows directly into the Studio codebase. This enabled rapid iteration with users and collapsed delivery timelines from months to days.`,
    thumbnail: '/images/projects/plotlystudio/plotly-thumbnail.png',
    images: [
      {
        src: '/images/projects/plotlystudio/plotly-thumbnail.png',
        alt: 'Users can create AI generated visualizations',
        description: 'AI-powered visualization creation interface'
      },
      {
        src: '/images/projects/plotlystudio/plotly-1.png',
        alt: 'Users upload data',
        description: 'Data upload interface'
      },
      {
        src: '/images/projects/plotlystudio/plotly-2.png',
        alt: 'They set context using their preferred language',
        description: 'Natural language context setting'
      },
      {
        src: '/images/projects/plotlystudio/plotly-3.png',
        alt: 'AI generated dashboard',
        description: 'Generated dashboard with theme and chart customization options'
      },
    ],
    tags: ['AI/ML', 'Data Visualization', 'Product Design', 'Natural Language Processing'],
    achievements: [
      'Led end-to-end design for core Studio experiences',
      'Bridged product, UX, and engineering teams',
      'Delivered AI-first workflow grounded in real user needs',
      'Vibe-coded complete flows directly into codebase',
      'Collapsed delivery timelines from months to days',
      'Enabled rapid iteration with users'
    ]
  },
  {
    id: 'data-viz-dashboards',
    slug: 'data-visualization-for-businesses',
    title: 'Data Visualization for Businesses',
    client: 'iQmetrix',
    role: 'UX Designer',
    category: ['Data Visualization', 'Dashboard Design', 'Enterprise'],
    description: 'Redesigned sales performance dashboards for the dominant point-of-sale system in the wireless industry. Created a modular, web-based, fully mobile-friendly, customizable dashboarding system.',
    longDescription: `I was tasked with redesigning the sales performance dashboards used in the dominant point-of-sale system in the wireless industry.

We began by conducting interviews with customers to understand what they found useful or not useful in their current dashboard. Each customer had unique preferences; for some, certain metrics were indispensable, while others prioritized different ones. Interestingly, many interviewees admitted to disregarding certain parts of the dashboard altogether.

Based on this feedback, I developed a modular, web-based, fully mobile-friendly, customizable dashboarding system. Users have the flexibility to add and configure metrics they prioritize using a combination of configurable cards. These cards can be tailored in size and viewed as charts, lists, or even maps, offering a multitude of ways to visualize the same data according to a retailer's specific requirements.

This system enables businesses to create and share targeted dashboards to monitor their operations and influence employee behaviour.`,
    thumbnail: '/images/projects/dashboards/dashboards-thumbnail.png',
    images: [
      {
        src: '/images/projects/dashboards/dashboards-thumbnail.png',
        alt: 'Configured Custom Dashboard',
        description: 'Example of a fully configured dashboard where a business has set up a variety of ways of consuming data'
      },
      {
        src: '/images/projects/dashboards/dashboards-1.png',
        alt: 'Dashboard List',
        description: 'A list of custom created dashboards that can be shared and reviewed at any time'
      },
      {
        src: '/images/projects/dashboards/dashboards-2.png',
        alt: 'Adding Metrics Card to a Dashboard',
        description: 'Screen where the user chooses the type of metrics card to add to a dashboard'
      },
      {
        src: '/images/projects/dashboards/dashboards-3.png',
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
    thumbnail: '/images/projects/retail/retail-thumbnail.png',
    images: [
      {
        src: '/images/projects/retail/retail-1.png',
        alt: 'Online Inventory Management',
        description: 'Centralized experience that syncs product information and stock numbers between back of house, and point of sale.'
      },
      {
        src: '/images/projects/retail/retail-thumbnail.png',
        alt: 'Point of Sale Employee Experience',
        description: 'The service view of inventory and sales actions on tablet.'
      },
      {
        src: '/images/projects/retail/retail-2.png',
        alt: 'Customer Targeted Suggestions',
        description: 'Employee can suggest product offerings based on customer history and preferences'
      },
      {
        src: '/images/projects/retail/retail-3.png',
        alt: 'Loyalty',
        description: 'Employees can see customer loyalty accumulation, and suggest redemption'
      },
      {
        src: '/images/projects/retail/retail-4.png',
        alt: 'Invoice Management',
        description: 'Customer history can be retrieved for returns and verification at the point of sale and also in the back of house system'
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
    thumbnail: '/images/projects/navarik/navarik-thumbnail.png',
    images: [
      {
        src: '/images/projects/navarik/navarik-thumbnail.png',
        alt: 'Navarik Inspection Interface',
        description: 'Inspection workflow interface'
      },
      {
        src: '/images/projects/navarik/navarik-1.png',
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
    longDescription: `[Read IGN review of Game Viewer and Intelligence Tool](https://www.ign.com/articles/2005/11/05/battlefield-2s-modern-strategy)

Creative Direction and Interaction Architecture for EA games websites. Including Godfather, Need for Speed, and Battlefield. I worked with client to improve and deliver first class User Experience and also meet EA's marketing objectives. Interface design and conceptual development.

**Key achievement** was the redesign and interaction architecture for EA Battlefield 2 website, and design of industry first online game viewer and intelligence tool.

This allowed users playing the game to log into the site after they had played, and use an intelligence tool to plan with their clan their next strategies when they play again. So cool.`,
    thumbnail: '/images/projects/ea-games/ea-games-thumbnail.jpg',
    images: [
      {
        src: '/images/projects/ea-games/ea-games-thumbnail.jpg',
        alt: 'Battlefield 2 Modern Combat',
        description: 'Battlefield 2 game interface'
      },
      {
        src: '/images/projects/ea-games/ea-games-1.png',
        alt: 'EA Games Interface',
        description: 'EA Games website interface'
      },
      {
        src: '/images/projects/ea-games/ea-games-2.jpg',
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
    thumbnail: '/images/projects/peugeot/peugeot-thumbnail.png',
    images: [
      {
        src: '/images/projects/peugeot/peugeot-thumbnail.png',
        alt: 'Peugeot Site Screenshot',
        description: 'Peugeot website interface'
      },
      {
        src: '/images/projects/peugeot/peugeot-1.png',
        alt: 'Peugeot Site Screenshot',
        description: 'Peugeot website interface'
      },
      {
        src: '/images/projects/peugeot/peugeot-2.png',
        alt: 'Peugeot Site Screenshot',
        description: 'Peugeot website interface'
      },
      {
        src: '/images/projects/peugeot/peugeot-3.png',
        alt: 'Peugeot Site Screenshot',
        description: 'Peugeot website interface'
      },
      {
        src: '/images/projects/peugeot/peugeot-4.png',
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
    thumbnail: '/images/projects/bodog/bodog-thumbnail.jpg',
    images: [
      {
        src: '/images/projects/bodog/bodog-thumbnail.jpg',
        alt: 'Bodog Homepage',
        description: 'Bodog.com homepage design'
      },
      {
        src: '/images/projects/bodog/bodog-1.jpg',
        alt: 'Bodog .net Homepage',
        description: 'Bodog.net homepage final design'
      },
      {
        src: '/images/projects/bodog/bodog-2.jpg',
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
    thumbnail: '/images/projects/intel/intel-thumbnail.png',
    images: [
      {
        src: '/images/projects/intel/intel-thumbnail.png',
        alt: 'Intel CMS Interface',
        description: 'Intel content management system interface'
      },
      {
        src: '/images/projects/intel/intel-1.png',
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
    thumbnail: '/images/projects/ebookers/ebookers-thumbnail.jpg',
    images: [
      {
        src: '/images/projects/ebookers/ebookers-thumbnail.jpg',
        alt: 'Ebookers Brisbane',
        description: 'Ebookers interface'
      },
      {
        src: '/images/projects/ebookers/ebookers-1.png',
        alt: 'Ebookers Interface',
        description: 'Ebookers booking interface screenshot'
      },
      {
        src: '/images/projects/ebookers/ebookers-2.jpg',
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
  {
    id: 'best-buy-strategy',
    slug: 'best-buy-ux-strategy',
    title: 'Best Buy - UX Strategy that Transformed bestbuy.ca',
    client: 'Best Buy Canada',
    role: 'Senior UX Designer',
    category: ['E-commerce', 'UX Strategy', 'Transformation'],
    description: 'UX Strategy that Transformed bestbuy.ca to its Current Robust Platform. Led strategic UX initiatives that fundamentally transformed the e-commerce experience for Best Buy Canada.',
    longDescription: `Upon joining, I assumed a lead and mentorship role for the UX design team. The biggest challenge was putting together a UX that would drive the next generation platform that Best Buy would use to deliver content, products information, and sales. This endeavour aimed to identify and design all the necessary components required to operate bestbuy.ca and establish processes for their management and deployment, facilitating the organization's content delivery for products and purchases. The project represented a significant initiative by Best Buy to transition its aging website to a new Content Driven platform.

My approach began with extensive conversations across the organization to ascertain the essential content elements required for the site at a foundational level. Subsequently, I developed wireframes and interaction design patterns covering a wide array of basic use cases, including product launches, events, and the range of products and services offered by Best Buy. By adopting a component-driven strategy and leveraging a content management system, I created multiple design components adaptable to various configurations on different types of pages.

This system now serves as the backbone of the current Best Buy site, with the company continuously utilizing and refining these components to provide comprehensive product and service information to millions of Canadians.`,
    thumbnail: '/images/projects/bestbuy-strategy/bestbuy-strategy-thumbnail.png',
    images: [
      {
        src: '/images/projects/bestbuy-strategy/bestbuy-strategy-1.png',
        alt: 'Best Buy Strategy Screenshot',
        description: 'UX Strategy work for Best Buy'
      },
      {
        src: '/images/projects/bestbuy-strategy/bestbuy-strategy-thumbnail.png',
        alt: 'Best Buy Strategy Screenshot',
        description: 'UX Strategy transformation'
      },
      {
        src: '/images/projects/bestbuy-strategy/bestbuy-strategy-2.png',
        alt: 'Best Buy Strategy Screenshot',
        description: 'Strategic UX initiatives'
      },
      {
        src: '/images/projects/bestbuy-strategy/bestbuy-strategy-3.png',
        alt: 'Best Buy Strategy Screenshot',
        description: 'E-commerce experience redesign'
      },
      {
        src: '/images/projects/bestbuy-strategy/bestbuy-strategy-4.png',
        alt: 'Best Buy Strategy',
        description: 'Best Buy UX Strategy work'
      },
    ],
    tags: ['UX Strategy', 'E-commerce', 'Transformation', 'Platform Design'],
    achievements: [
      'Transformed bestbuy.ca to current robust platform',
      'Lead and mentorship role for UX design team',
      'Component-driven strategy with CMS',
      'Created backbone system still in use today',
      'Designed for millions of Canadian users'
    ]
  },
  {
    id: 'best-buy-vision',
    slug: 'best-buy-united-vision',
    title: 'Best Buy - Connecting Teams with a United Vision',
    client: 'Best Buy',
    role: 'UX Strategist',
    category: ['UX Strategy', 'Team Alignment', 'User Journey'],
    description: 'Created high-level user journey conceptual blueprint to connect teams with a united vision. Aligned cross-functional teams around shared user experience principles.',
    longDescription: `As part of the Best Buy transformation initiative, I created a high-level user journey conceptual blueprint that served as a foundational artifact to connect cross-functional teams with a united vision. This blueprint was essential for aligning product, engineering, marketing, and design teams around shared user experience principles and a common understanding of customer journeys.

The conceptual blueprint mapped out key customer touchpoints and experiences across the entire bestbuy.ca ecosystem, from discovery through purchase and post-purchase support. By creating this visual and strategic document, I enabled teams to see how their individual work connected to the larger customer experience, fostering better collaboration and decision-making.

This artifact became a critical reference point for strategic planning, helping teams prioritize features and initiatives based on their impact on the overall user journey rather than in isolation. The blueprint ensured that all teams were working toward the same customer experience goals, reducing friction and misalignment across the organization.`,
    thumbnail: '/images/projects/best-buy-vision/bestbuy-vision-thumbnail.png',
    images: [
      {
        src: '/images/projects/best-buy-vision/bestbuy-vision-thumbnail.png',
        alt: 'User Journey',
        description: 'User journey mapping artifact'
      },
    ],
    tags: ['UX Strategy', 'Team Alignment', 'User Journey', 'Blueprint Design'],
    achievements: [
      'High-level user journey conceptual blueprint',
      'Connected teams with united vision',
      'Cross-functional alignment',
      'Strategic artifact for organizational planning',
      'Enabled better prioritization and collaboration'
    ]
  },
  {
    id: 'hr-block',
    slug: 'hr-block-service-design',
    title: 'H&R Block - Assessing and Improving the Service Design Model',
    client: 'H&R Block',
    role: 'UX Designer',
    category: ['Service Design', 'Tax Services', 'User Research'],
    description: 'Assessing and Improving the Service Design Model for H&R Block. Worked on service design improvements to enhance the tax preparation experience.',
    thumbnail: '/images/projects/hr-block/hr-block-thumbnail.png', // hr issues.png
    images: [
      {
        src: '/images/projects/hr-block/hr-block-thumbnail.png',
        alt: 'H&R Block Issues',
        description: 'Service design issues identified'
      },
      {
        src: '/images/projects/hr-block/hr-block-1.png',
        alt: 'Desktop Collapsed',
        description: 'Desktop interface design'
      },
      {
        src: '/images/projects/hr-block/hr-block-2.png',
        alt: 'Tax Scenario',
        description: 'Tax scenario interface'
      },
      {
        src: '/images/projects/hr-block/hr-block-3.png',
        alt: 'User Journey',
        description: 'User journey mapping for tax preparation'
      },
      {
        src: '/images/projects/hr-block/hr-block-4.png',
        alt: 'Filtering',
        description: 'Filtering interface'
      },
    ],
    tags: ['Service Design', 'Tax Services', 'User Research', 'Process Improvement'],
    achievements: [
      'Service design model improvements',
      'Enhanced tax preparation experience'
    ]
  },
  {
    id: 'fishtank',
    slug: 'fishtank-high-profile-websites',
    title: 'Fishtank - High Profile Websites - Data Viz for Marketing - Design Thinking',
    client: 'Fishtank',
    role: 'UX Designer',
    category: ['Web Design', 'Data Visualization', 'Marketing', 'Design Thinking'],
    description: 'High profile website projects with data visualization for marketing purposes, applying design thinking methodologies.',
    longDescription: `Fishtank projects focused on creating high-profile websites with data visualization for marketing purposes. These projects applied design thinking methodologies to create engaging, data-driven experiences for marketing campaigns.`,
    thumbnail: '/images/projects/fishtank/fishtank-thumbnail.png',
    images: [
      {
        src: '/images/projects/fishtank/fishtank-thumbnail.png',
        alt: 'Travel Sask - Design Component Summary',
        description: 'Design Component Summary - Component configurations that can be used on any page within the website'
      },
      {
        src: '/images/projects/fishtank/fishtank-1.png',
        alt: 'Travel Sask - Targeted Content',
        description: 'Using user types to give different types of travel business owners the ability to filter content specific to their type of business'
      },
      {
        src: '/images/projects/fishtank/fishtank-2.png',
        alt: 'Travel Sask - Fishing Site',
        description: 'Using reusable components from the business hub, the same system could be applied to many other sites'
      },
      {
        src: '/images/projects/fishtank/fishtank-3.png',
        alt: 'Bow Valley College',
        description: 'Component driven redesign / navigation redesign'
      },
    ],
    tags: ['Web Design', 'Data Visualization', 'Marketing', 'Design Thinking'],
    achievements: [
      'High-profile website designs',
      'Data visualization for marketing',
      'Design thinking methodologies'
    ]
  },
  {
    id: 'payload',
    slug: 'payload-logistic-management',
    title: 'PAYLOAD - End-to-End Logistic Management Design',
    client: 'PAYLOAD',
    role: 'UX Designer',
    category: ['Logistics', 'Enterprise Software', 'Supply Chain'],
    description: 'End-to-end logistic management design system for comprehensive supply chain and logistics operations.',
    longDescription: `PAYLOAD is an end-to-end logistic management design system. This comprehensive solution covers all aspects of logistics operations, from inventory management to shipping coordination, providing a unified interface for complex supply chain workflows.`,
    thumbnail: '/images/projects/payload/payload-thumbnail.png',
    images: [
      {
        src: '/images/projects/payload/payload-thumbnail.png',
        alt: 'Design Pattern Library',
        description: 'Created and maintained a design pattern library to ensure the development team, and company at large understands how all pages should look and behave'
      },
      {
        src: '/images/projects/payload/payload-1.png',
        alt: 'Field Ticket Reporting',
        description: 'As events happen out in the field in trucks, it is sent back to the head office where all the events are summarized, and the service can be billed out and seen by each party'
      },
    ],
    tags: ['Logistics', 'Enterprise Software', 'Supply Chain', 'UX Design'],
    achievements: [
      'End-to-end logistics solution',
      'Comprehensive supply chain management',
      'Unified workflow interface'
    ]
  },
  {
    id: 'queue',
    slug: 'queue-management',
    title: 'Queue Management System',
    client: 'iQmetrix',
    role: 'UX Designer',
    category: ['Retail Systems', 'Customer Experience', 'Queue Management'],
    description: 'Queue management system designed to optimize customer flow and service efficiency in retail environments.',
    longDescription: `Queue management system designed to optimize customer flow and service efficiency in retail environments. This system helps manage customer queues, wait times, and service appointments, improving both customer experience and operational efficiency.`,
    thumbnail: '/images/projects/queue/queue-thumbnail.png',
    images: [
      {
        src: '/images/projects/queue/queue-thumbnail.png',
        alt: 'Queue Screen',
        description: 'Queue management interface for retail environments'
      },
      {
        src: '/images/projects/queue/queue-1.png',
        alt: 'Customer Profiles',
        description: 'Customer information could be easily accessed by scanning ID or searching. Required legal documents could are attached to the profile, and the screen warns of expiries or issues'
      },
    ],
    tags: ['Retail Systems', 'Customer Experience', 'Queue Management', 'UX Design'],
    achievements: [
      'Optimized customer flow',
      'Improved service efficiency',
      'Enhanced customer experience'
    ]
  },
  {
    id: 'nike',
    slug: 'nike-marketing-sites',
    title: 'Nike Marketing Sites / Apparel Catalogs',
    client: 'Nike',
    role: 'UX Designer',
    category: ['E-commerce', 'Marketing', 'Apparel', 'Catalogs'],
    description: 'Marketing websites and apparel catalog systems for Nike, creating engaging product presentation and browsing experiences.',
    longDescription: `Marketing websites and apparel catalog systems for Nike. These projects focused on creating engaging product presentation and browsing experiences, showcasing Nike's athletic apparel and footwear through innovative catalog interfaces and marketing websites.`,
    thumbnail: '/images/projects/nike/nike-thumbnail.png',
    images: [
      {
        src: '/images/projects/nike/nike-1.jpg',
        alt: 'Nike Baltimore',
        description: 'Nike marketing site - Baltimore'
      },
      {
        src: '/images/projects/nike/nike-thumbnail.png',
        alt: 'Nike Jumpman 23',
        description: 'Nike Jumpman 23 marketing site'
      },
      {
        src: '/images/projects/nike/nike-2.jpg',
        alt: 'Nike Jumpman 23',
        description: 'Nike Jumpman 23 campaign'
      },
      {
        src: '/images/projects/nike/nike-3.jpg',
        alt: 'NikeGo Home',
        description: 'NikeGo homepage design'
      },
    ],
    tags: ['E-commerce', 'Marketing', 'Apparel', 'Catalogs', 'UX Design'],
    achievements: [
      'Marketing website designs',
      'Apparel catalog systems',
      'Engaging product presentation'
    ]
  },
  {
    id: 'ignite-works',
    slug: 'ignite-works-digital-services',
    title: 'Ignite Works Digital Services - Co-Founder',
    client: 'Ignite Works Digital Services',
    role: 'Co-Founder',
    category: ['Consulting', 'Service Design', 'Product Strategy'],
    description: 'Co-founder of a consulting company providing on-demand contracting services for Service Design, Product Strategy, and Development. We specialize in crafting product visions and designing/building digital experiences for ambitious innovators.',
    longDescription: `Co-founder of a consulting company providing on-demand contracting services for Service Design, Product Strategy, and Development. We specialize in crafting product visions and designing/building digital experiences for ambitious innovators.

We conducted a number of discovery sessions with clients and helped them craft their product visions. Ultimately, the incoming revenue did not support continuing, but in the short time we were able to help "ignite" product visions for three clients.`,
    thumbnail: '/images/projects/ignite-works/ignite-works-thumbnail.png',
    images: [
      {
        src: '/images/projects/ignite-works/ignite-works-thumbnail.png',
        alt: 'Ignite Works Home',
        description: 'Ignite Works Digital Services homepage'
      },
    ],
    tags: ['Service Design', 'Product Strategy', 'Consulting', 'Business Development'],
    achievements: [
      'Co-founded consulting company',
      'Conducted discovery sessions with clients',
      'Helped craft product visions',
      'Designed and built digital experiences',
      'Successfully helped three clients ignite their product visions'
    ]
  },
]

