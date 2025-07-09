import React, { useState } from 'react';

const JobBoardHomepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      posted: "2 days ago",
      logo: "🚀",
      tags: ["React", "TypeScript", "Remote OK"]
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Design Studio",
      location: "New York, NY",
      salary: "$90k - $120k",
      type: "Full-time",
      posted: "1 day ago",
      logo: "🎨",
      tags: ["Figma", "Sketch", "Remote"]
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Austin, TX",
      salary: "$130k - $160k",
      type: "Full-time",
      posted: "3 days ago",
      logo: "📊",
      tags: ["Python", "ML", "Remote OK"]
    }
  ];

  const categories = [
    { name: "Technology", count: 1245, icon: "💻", color: "#3B82F6" },
    { name: "Design", count: 532, icon: "🎨", color: "#8B5CF6" },
    { name: "Marketing", count: 789, icon: "📢", color: "#10B981" },
    { name: "Sales", count: 634, icon: "💼", color: "#F59E0B" },
    { name: "Finance", count: 423, icon: "💰", color: "#EAB308" },
    { name: "Healthcare", count: 356, icon: "🏥", color: "#EF4444" }
  ];

  const companies = [
    { name: "Google", jobs: 45, logo: "🏢" },
    { name: "Microsoft", jobs: 32, logo: "🏢" },
    { name: "Apple", jobs: 28, logo: "🏢" },
    { name: "Meta", jobs: 41, logo: "🏢" },
    { name: "Amazon", jobs: 67, logo: "🏢" },
    { name: "Netflix", jobs: 23, logo: "🏢" }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '80px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    nav: {
      display: 'flex',
      gap: '2rem'
    },
    navLink: {
      color: '#374151',
      fontWeight: '500',
      textDecoration: 'none',
      transition: 'color 0.3s',
      cursor: 'pointer'
    },
    authButtons: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    signInBtn: {
      color: '#374151',
      fontWeight: '500',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'color 0.3s'
    },
    postJobBtn: {
      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      color: 'white',
      padding: '0.5rem 1.5rem',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s',
      transform: 'scale(1)'
    },
    hero: {
      padding: '5rem 1rem',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: 'clamp(2.5rem, 8vw, 4rem)',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '1.5rem',
      lineHeight: '1.2'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      color: '#6B7280',
      marginBottom: '2rem',
      maxWidth: '768px',
      margin: '0 auto 2rem'
    },
    searchContainer: {
      maxWidth: '1024px',
      margin: '0 auto 4rem',
      padding: '0 1rem'
    },
    searchBox: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      padding: '1.5rem',
      border: '1px solid #E5E7EB'
    },
    searchInputs: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '1rem'
    },
    inputGroup: {
      position: 'relative',
      flex: 1
    },
    inputIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9CA3AF',
      zIndex: 1
    },
    input: {
      width: '100%',
      paddingLeft: '3rem',
      paddingRight: '1rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      border: '1px solid #D1D5DB',
      borderRadius: '12px',
      fontSize: '1rem',
      transition: 'all 0.3s',
      outline: 'none',
      boxSizing: 'border-box'
    },
    searchButton: {
      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontSize: '1rem'
    },
    popularTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      alignItems: 'center'
    },
    tag: {
      fontSize: '0.875rem',
      backgroundColor: '#F3F4F6',
      color: '#374151',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      marginBottom: '5rem',
      maxWidth: '1280px',
      margin: '0 auto 5rem',
      padding: '0 1rem'
    },
    statItem: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    statLabel: {
      color: '#6B7280'
    },
    section: {
      padding: '4rem 1rem',
      backgroundColor: 'white'
    },
    sectionTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '0.5rem',
      textAlign: 'center'
    },
    sectionSubtitle: {
      color: '#6B7280',
      textAlign: 'center',
      marginBottom: '3rem'
    },
    jobGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      maxWidth: '1280px',
      margin: '0 auto'
    },
    jobCard: {
      backgroundColor: 'white',
      border: '1px solid #E5E7EB',
      borderRadius: '16px',
      padding: '1.5rem',
      transition: 'all 0.3s',
      cursor: 'pointer'
    },
    jobHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    jobLogo: {
      width: '48px',
      height: '48px',
      background: 'linear-gradient(135deg, #DBEAFE, #E0E7FF)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem'
    },
    jobTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.5rem',
      transition: 'color 0.3s'
    },
    jobCompany: {
      color: '#6B7280',
      marginBottom: '1rem'
    },
    jobDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    jobDetail: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      color: '#6B7280'
    },
    jobTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    jobTag: {
      fontSize: '0.75rem',
      backgroundColor: '#DBEAFE',
      color: '#2563EB',
      padding: '0.25rem 0.5rem',
      borderRadius: '12px'
    },
    applyButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      color: 'white',
      padding: '0.75rem',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    categoryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      maxWidth: '1280px',
      margin: '0 auto'
    },
    categoryCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      textAlign: 'center',
      transition: 'all 0.3s',
      cursor: 'pointer',
      border: '1px solid #F3F4F6'
    },
    categoryIcon: {
      width: '64px',
      height: '64px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      margin: '0 auto 1rem'
    },
    categoryName: {
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.25rem'
    },
    categoryCount: {
      fontSize: '0.875rem',
      color: '#6B7280'
    },
    cta: {
      padding: '5rem 1rem',
      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      textAlign: 'center'
    },
    ctaTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1rem'
    },
    ctaSubtitle: {
      fontSize: '1.25rem',
      color: '#BFDBFE',
      marginBottom: '2rem'
    },
    ctaButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      alignItems: 'center'
    },
    ctaButtonPrimary: {
      backgroundColor: 'white',
      color: '#3B82F6',
      padding: '1rem 2rem',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    ctaButtonSecondary: {
      border: '2px solid white',
      backgroundColor: 'transparent',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    footer: {
      backgroundColor: '#111827',
      color: 'white',
      padding: '3rem 1rem'
    },
    footerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem'
    },
    footerBrand: {
      marginBottom: '1rem'
    },
    footerDescription: {
      color: '#9CA3AF',
      marginBottom: '1rem',
      lineHeight: '1.6'
    },
    socialLinks: {
      display: 'flex',
      gap: '1rem'
    },
    socialLink: {
      width: '32px',
      height: '32px',
      backgroundColor: '#374151',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    footerSection: {
      marginBottom: '1rem'
    },
    footerTitle: {
      fontWeight: '600',
      marginBottom: '1rem'
    },
    footerList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    footerLink: {
      color: '#9CA3AF',
      textDecoration: 'none',
      transition: 'color 0.3s',
      cursor: 'pointer',
      display: 'block',
      padding: '0.25rem 0'
    },
    footerCopyright: {
      borderTop: '1px solid #374151',
      paddingTop: '2rem',
      marginTop: '2rem',
      textAlign: 'center',
      color: '#9CA3AF'
    }
  };

  // SVG Icons as components
  const SearchIcon = () => (
    <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const MapPinIcon = () => (
    <svg style={{width: '16px', height: '16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const ClockIcon = () => (
    <svg style={{width: '16px', height: '16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12,6 12,12 16,14"></polyline>
    </svg>
  );

  const DollarIcon = () => (
    <svg style={{width: '16px', height: '16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );

  const StarIcon = () => (
    <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
    </svg>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              💼
            </div>
            <span style={styles.logoText}>JobFlow</span>
          </div>
          <nav style={styles.nav}>
            <a href="#" style={styles.navLink}>Find Jobs</a>
            <a href="#" style={styles.navLink}>Companies</a>
            <a href="#" style={styles.navLink}>Resources</a>
            <a href="#" style={styles.navLink}>Contact</a>
          </nav>
          <div style={styles.authButtons}>
            <button style={styles.signInBtn}>Sign In</button>
            <button 
              style={styles.postJobBtn}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Post a Job
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Find Your <span style={styles.gradientText}>Dream Job</span><br />Today
        </h1>
        <p style={styles.heroSubtitle}>
          Discover thousands of job opportunities from top companies worldwide. 
          Your next career move is just a search away.
        </p>

        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <div style={styles.searchBox}>
            <div style={styles.searchInputs}>
              <div style={styles.inputGroup}>
                <div style={styles.inputIcon}>
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <div style={styles.inputIcon}>
                  <MapPinIcon />
                </div>
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={styles.input}
                />
              </div>
              <button 
                style={styles.searchButton}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Search Jobs
              </button>
            </div>
            <div style={styles.popularTags}>
              <span style={{fontSize: '0.875rem', color: '#6B7280'}}>Popular searches:</span>
              {["Remote", "Frontend", "Marketing", "Data Science"].map((tag) => (
                <button 
                  key={tag} 
                  style={styles.tag}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#DBEAFE';
                    e.target.style.color = '#2563EB';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#F3F4F6';
                    e.target.style.color = '#374151';
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>50,000+</div>
            <div style={styles.statLabel}>Active Jobs</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>15,000+</div>
            <div style={styles.statLabel}>Companies</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>2M+</div>
            <div style={styles.statLabel}>Job Seekers</div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section style={styles.section}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem'}}>
            <div>
              <h2 style={styles.sectionTitle}>Featured Jobs</h2>
              <p style={styles.sectionSubtitle}>Handpicked opportunities from top companies</p>
            </div>
          </div>

          <div style={styles.jobGrid}>
            {featuredJobs.map((job) => (
              <div 
                key={job.id} 
                style={styles.jobCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgb(0 0 0 / 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={styles.jobHeader}>
                  <div style={styles.jobLogo}>
                    {job.logo}
                  </div>
                  <div style={{color: '#D1D5DB', cursor: 'pointer'}}>
                    <StarIcon />
                  </div>
                </div>
                
                <h3 style={styles.jobTitle}>{job.title}</h3>
                <p style={styles.jobCompany}>{job.company}</p>
                
                <div style={styles.jobDetails}>
                  <div style={styles.jobDetail}>
                    <div style={{marginRight: '0.5rem'}}><MapPinIcon /></div>
                    {job.location}
                  </div>
                  <div style={styles.jobDetail}>
                    <div style={{marginRight: '0.5rem'}}><DollarIcon /></div>
                    {job.salary}
                  </div>
                  <div style={styles.jobDetail}>
                    <div style={{marginRight: '0.5rem'}}><ClockIcon /></div>
                    {job.posted}
                  </div>
                </div>
                
                <div style={styles.jobTags}>
                  {job.tags.map((tag) => (
                    <span key={tag} style={styles.jobTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button 
                  style={styles.applyButton}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section style={{...styles.section, backgroundColor: '#f8fafc'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h2 style={styles.sectionTitle}>Browse by Category</h2>
          <p style={styles.sectionSubtitle}>Find jobs in your field of expertise</p>

          <div style={styles.categoryGrid}>
            {categories.map((category) => (
              <div 
                key={category.name} 
                style={styles.categoryCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 25px -5px rgb(0 0 0 / 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  ...styles.categoryIcon,
                  backgroundColor: category.color + '20',
                  color: category.color
                }}>
                  {category.icon}
                </div>
                <h3 style={styles.categoryName}>{category.name}</h3>
                <p style={styles.categoryCount}>{category.count} jobs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section style={styles.section}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h2 style={styles.sectionTitle}>Top Companies Hiring</h2>
          <p style={styles.sectionSubtitle}>Join industry leaders and innovative startups</p>

          <div style={styles.categoryGrid}>
            {companies.map((company) => (
              <div 
                key={company.name} 
                style={{...styles.categoryCard, backgroundColor: '#f8fafc'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 25px -5px rgb(0 0 0 / 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  ...styles.categoryIcon,
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                }}>
                  {company.logo}
                </div>
                <h3 style={styles.categoryName}>{company.name}</h3>
                <p style={styles.categoryCount}>{company.jobs} open positions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to Take the Next Step?</h2>
        <p style={styles.ctaSubtitle}>
          Join thousands of professionals who have found their dream jobs through JobFlow
        </p>
        <div style={{...styles.ctaButtons, flexDirection: 'row', justifyContent: 'center'}}>
          <button 
            style={styles.ctaButtonPrimary}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Browse All Jobs
          </button>
          <button 
            style={styles.ctaButtonSecondary}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#3B82F6';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'white';
            }}
          >
            Post a Job
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div>
            <div style={{...styles.logo, ...styles.footerBrand}}>
              <div style={{...styles.logoIcon, width: '32px', height: '32px'}}>
                💼
              </div>
              <span style={{...styles.logoText, color: 'white', fontSize: '1.25rem'}}>JobFlow</span>
            </div>
            <p style={styles.footerDescription}>
              Connecting talented professionals with amazing opportunities worldwide.
            </p>
            <div style={styles.socialLinks}>
              <div style={styles.socialLink}>f</div>
              <div style={styles.socialLink}>t</div>
              <div style={styles.socialLink}>in</div>
            </div>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>For Job Seekers</h3>
            <ul style={styles.footerList}>
              <li><a href="#" style={styles.footerLink}>Browse Jobs</a></li>
              <li><a href="#" style={styles.footerLink}>Career Advice</a></li>
              <li><a href="#" style={styles.footerLink}>Resume Builder</a></li>
              <li><a href="#" style={styles.footerLink}>Salary Guide</a></li>
            </ul>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>For Employers</h3>
            <ul style={styles.footerList}>
              <li><a href="#" style={styles.footerLink}>Post a Job</a></li>
              <li><a href="#" style={styles.footerLink}>Browse Resumes</a></li>
              <li><a href="#" style={styles.footerLink}>Pricing</a></li>
              <li><a href="#" style={styles.footerLink}>Recruitment Tips</a></li>
            </ul>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Company</h3>
            <ul style={styles.footerList}>
              <li><a href="#" style={styles.footerLink}>About Us</a></li>
              <li><a href="#" style={styles.footerLink}>Contact</a></li>
              <li><a href="#" style={styles.footerLink}>Privacy Policy</a></li>
              <li><a href="#" style={styles.footerLink}>Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div style={styles.footerCopyright}>
          <p>&copy; 2025 JobFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default JobBoardHomepage;