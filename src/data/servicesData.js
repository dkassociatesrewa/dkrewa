
export const servicesData = [
  {
    category: "cleaning_housekeeping",
    categoryName: "Cleaning & Housekeeping",
    icon: "🧹",
    services: [
      {
        id: "clean-001",
        serviceName: "Deep Cleaning",
        description: "Comprehensive deep cleaning for kitchens, bathrooms, carpets, and upholstery",
        basePrice: 2500,
        pricingModel: "fixed",
        estimatedDuration: 240,
        requiredSkills: ["deep_cleaning", "sanitization", "equipment_handling"],
        subServices: ["Kitchen Deep Cleaning", "Bathroom Sanitization", "Carpet Cleaning", "Upholstery Cleaning", "Post-Construction Cleaning"]
      },
      {
        id: "clean-002",
        serviceName: "Regular Housekeeping & Maid Services",
        description: "Daily, weekly, or monthly housekeeping services",
        basePrice: 500,
        pricingModel: "hourly",
        estimatedDuration: 60,
        requiredSkills: ["housekeeping", "organization", "time_management"],
        subServices: ["Daily Cleaning", "Weekly Housekeeping", "Monthly Deep Clean", "Kitchen Organization"]
      },
      {
        id: "clean-003",
        serviceName: "Laundry, Ironing & Wardrobe Organization",
        description: "Complete laundry and wardrobe management services",
        basePrice: 300,
        pricingModel: "hourly",
        estimatedDuration: 120,
        requiredSkills: ["laundry", "ironing", "organization"],
        subServices: ["Laundry Service", "Ironing", "Wardrobe Organization", "Dry Cleaning Coordination"]
      },
      {
        id: "clean-004",
        serviceName: "Pest Control & Sanitization",
        description: "Professional pest control and sanitization services",
        basePrice: 1500,
        pricingModel: "fixed",
        estimatedDuration: 180,
        requiredSkills: ["pest_control", "sanitization", "safety_protocols"],
        subServices: ["General Pest Control", "Termite Treatment", "Sanitization", "Fumigation"]
      }
    ]
  },
  {
    category: "repair_maintenance",
    categoryName: "Repair & Maintenance",
    icon: "🔧",
    services: [
      {
        id: "repair-001",
        serviceName: "Electrical Repairs",
        description: "Wiring, switches, appliances, and electrical installations",
        basePrice: 400,
        pricingModel: "hourly",
        estimatedDuration: 60,
        requiredSkills: ["electrical_work", "troubleshooting", "safety"],
        subServices: ["Wiring Repairs", "Switch Installation", "Appliance Repair", "Circuit Breaker Fixes"]
      },
      {
        id: "repair-002",
        serviceName: "Plumbing Services",
        description: "Leak fixes, installations, and tank cleaning",
        basePrice: 350,
        pricingModel: "hourly",
        estimatedDuration: 90,
        requiredSkills: ["plumbing", "pipe_fitting", "troubleshooting"],
        subServices: ["Leak Repairs", "Pipe Installation", "Tank Cleaning", "Drain Cleaning"]
      },
      {
        id: "repair-003",
        serviceName: "Carpentry Services",
        description: "Furniture repair and custom shelving solutions",
        basePrice: 450,
        pricingModel: "hourly",
        estimatedDuration: 120,
        requiredSkills: ["carpentry", "woodwork", "measurements"],
        subServices: ["Furniture Repair", "Custom Shelves", "Door Installation", "Cabinet Making"]
      },
      {
        id: "repair-004",
        serviceName: "Painting & Wall Finishing",
        description: "Interior and exterior painting services",
        basePrice: 300,
        pricingModel: "squarefeet",
        estimatedDuration: 480,
        requiredSkills: ["painting", "surface_preparation", "finishing"],
        subServices: ["Interior Painting", "Exterior Painting", "Wall Texturing", "Wallpaper Installation"]
      }
    ]
  },
  {
    category: "teaching_training",
    categoryName: "Teaching & Training",
    icon: "📚",
    services: [
      {
        id: "teach-001",
        serviceName: "Academic Tutoring",
        description: "School and college subject tutoring",
        basePrice: 400,
        pricingModel: "hourly",
        estimatedDuration: 60,
        requiredSkills: ["teaching", "subject_expertise", "communication"],
        subServices: ["Math Tutoring", "Science Tutoring", "English Tutoring", "Exam Preparation"]
      },
      {
        id: "teach-002",
        serviceName: "Language Training",
        description: "English, Hindi, and other language courses",
        basePrice: 350,
        pricingModel: "hourly",
        estimatedDuration: 60,
        requiredSkills: ["language_teaching", "communication", "patience"],
        subServices: ["English Speaking", "Hindi Classes", "Grammar Training", "Conversation Practice"]
      },
      {
        id: "teach-003",
        serviceName: "Computer & Digital Skills",
        description: "Computer basics to advanced digital skills training",
        basePrice: 500,
        pricingModel: "hourly",
        estimatedDuration: 90,
        requiredSkills: ["computer_literacy", "software_training", "teaching"],
        subServices: ["MS Office", "Programming Basics", "Internet Skills", "Digital Marketing"]
      },
      {
        id: "teach-004",
        serviceName: "Music, Yoga & Fitness Coaching",
        description: "Personal training for music, yoga, and fitness",
        basePrice: 600,
        pricingModel: "hourly",
        estimatedDuration: 60,
        requiredSkills: ["coaching", "fitness", "music"],
        subServices: ["Yoga Classes", "Fitness Training", "Music Lessons", "Meditation Coaching"]
      }
    ]
  },
  {
    category: "personal_assistance",
    categoryName: "Personal Assistance",
    icon: "🤝",
    services: [
      {
        id: "assist-001",
        serviceName: "Errand Running",
        description: "Grocery shopping, courier services, bill payments",
        basePrice: 200,
        pricingModel: "hourly",
        estimatedDuration: 60,
        requiredSkills: ["time_management", "reliability", "communication"],
        subServices: ["Grocery Shopping", "Courier Services", "Bill Payments", "Document Submission"]
      },
      {
        id: "assist-002",
        serviceName: "Virtual Assistant",
        description: "Email management, scheduling, data entry",
        basePrice: 300,
        pricingModel: "hourly",
        estimatedDuration: 60,
        requiredSkills: ["organization", "computer_skills", "communication"],
        subServices: ["Email Management", "Calendar Scheduling", "Data Entry", "Document Preparation"]
      },
      {
        id: "assist-003",
        serviceName: "Tour & Travel Services",
        description: "Drivers on hire and travel booking assistance",
        basePrice: 800,
        pricingModel: "hourly",
        estimatedDuration: 240,
        requiredSkills: ["driving", "navigation", "customer_service"],
        subServices: ["Driver on Hire", "Travel Booking", "Tour Planning", "Airport Transfers"]
      },
      {
        id: "assist-004",
        serviceName: "Event Assistance",
        description: "Wedding, party, and event management services",
        basePrice: 5000,
        pricingModel: "fixed",
        estimatedDuration: 480,
        requiredSkills: ["event_planning", "coordination", "decoration"],
        subServices: ["Wedding Planning", "Party Management", "Event Decoration", "Catering Coordination"]
      },
      {
        id: "assist-005",
        serviceName: "Insurance Services",
        description: "Life, health, and vehicle insurance assistance",
        basePrice: 0,
        pricingModel: "custom",
        estimatedDuration: 120,
        requiredSkills: ["insurance_knowledge", "consultation", "documentation"],
        subServices: ["Life Insurance", "Health Insurance", "Vehicle Insurance", "Policy Consultation"]
      }
    ]
  },
  {
    category: "creative_crafting",
    categoryName: "Creative & Crafting",
    icon: "🎨",
    services: [
      {
        id: "creative-001",
        serviceName: "Custom Furniture & Décor",
        description: "Handcrafted furniture and home décor items",
        basePrice: 3000,
        pricingModel: "custom",
        estimatedDuration: 720,
        requiredSkills: ["crafting", "design", "woodwork"],
        subServices: ["Custom Furniture", "Home Décor", "Handicrafts", "Restoration"]
      },
      {
        id: "creative-002",
        serviceName: "Graphic Design Services",
        description: "Logo design, branding, and visual content creation",
        basePrice: 1500,
        pricingModel: "fixed",
        estimatedDuration: 180,
        requiredSkills: ["graphic_design", "creativity", "software_skills"],
        subServices: ["Logo Design", "Branding", "Social Media Graphics", "Print Design"]
      },
      {
        id: "creative-003",
        serviceName: "Invitations & Creatives",
        description: "Custom invitations, posters, and marketing materials",
        basePrice: 800,
        pricingModel: "fixed",
        estimatedDuration: 120,
        requiredSkills: ["design", "creativity", "printing_knowledge"],
        subServices: ["Wedding Invitations", "Posters", "Flyers", "Business Cards"]
      }
    ]
  },
  {
    category: "office_support",
    categoryName: "Office & Professional Support",
    icon: "💼",
    services: [
      {
        id: "office-001",
        serviceName: "Data Entry & Documentation",
        description: "Professional data entry and transcription services",
        basePrice: 250,
        pricingModel: "hourly",
        estimatedDuration: 60,
        requiredSkills: ["typing", "accuracy", "computer_skills"],
        subServices: ["Data Entry", "Transcription", "Document Formatting", "Database Management"]
      },
      {
        id: "office-002",
        serviceName: "Social Media Management",
        description: "Social media strategy and digital marketing",
        basePrice: 800,
        pricingModel: "hourly",
        estimatedDuration: 60,
        requiredSkills: ["social_media", "marketing", "content_creation"],
        subServices: ["Content Planning", "Post Scheduling", "Analytics", "Ad Management"]
      },
      {
        id: "office-003",
        serviceName: "Website Design & SEO",
        description: "Website development and search engine optimization",
        basePrice: 10000,
        pricingModel: "custom",
        estimatedDuration: 2400,
        requiredSkills: ["web_development", "seo", "design"],
        subServices: ["Website Design", "SEO Optimization", "UI/UX Design", "Maintenance"]
      },
      {
        id: "office-004",
        serviceName: "HR Support Services",
        description: "Recruitment, training, and onboarding assistance",
        basePrice: 1000,
        pricingModel: "hourly",
        estimatedDuration: 120,
        requiredSkills: ["hr_management", "recruitment", "training"],
        subServices: ["Recruitment", "Training Programs", "Onboarding", "Policy Development"]
      }
    ]
  },
  {
    category: "specialized_services",
    categoryName: "Specialized & Miscellaneous",
    icon: "⚡",
    services: [
      {
        id: "special-001",
        serviceName: "Security Systems",
        description: "CCTV installation and smart lock systems",
        basePrice: 5000,
        pricingModel: "custom",
        estimatedDuration: 240,
        requiredSkills: ["electronics", "installation", "networking"],
        subServices: ["CCTV Installation", "Smart Locks", "Alarm Systems", "Monitoring Setup"]
      },
      {
        id: "special-002",
        serviceName: "Property Services",
        description: "Property buy/sell/rent assistance",
        basePrice: 0,
        pricingModel: "custom",
        estimatedDuration: 480,
        requiredSkills: ["real_estate", "negotiation", "documentation"],
        subServices: ["Property Search", "Documentation", "Legal Assistance", "Valuation"]
      },
      {
        id: "special-003",
        serviceName: "Photography & Videography",
        description: "Professional photography for events and products",
        basePrice: 3000,
        pricingModel: "fixed",
        estimatedDuration: 240,
        requiredSkills: ["photography", "videography", "editing"],
        subServices: ["Event Photography", "Product Photography", "Video Production", "Editing"]
      },
      {
        id: "special-004",
        serviceName: "Astrology & Counselling",
        description: "Astrology consultation and lifestyle counselling",
        basePrice: 500,
        pricingModel: "hourly",
        estimatedDuration: 60,
        requiredSkills: ["counselling", "astrology", "communication"],
        subServices: ["Astrology Consultation", "Life Coaching", "Career Counselling", "Relationship Advice"]
      }
    ]
  }
];

export const getAllServices = () => {
  return servicesData.flatMap(category => 
    category.services.map(service => ({
      ...service,
      category: category.category,
      categoryName: category.categoryName,
      categoryIcon: category.icon
    }))
  );
};

export const getServicesByCategory = (category) => {
  const categoryData = servicesData.find(c => c.category === category);
  return categoryData ? categoryData.services : [];
};

export const getServiceById = (serviceId) => {
  const allServices = getAllServices();
  return allServices.find(s => s.id === serviceId);
};
  