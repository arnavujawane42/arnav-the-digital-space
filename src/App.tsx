import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Play, Info, Search, ChevronDown,
  X, Code2 as Github, BriefcaseBusiness as Linkedin, Mail, Code2, Database,
  GraduationCap, Trophy, ChartNoAxesCombined, Layers3, Menu, UserRound, BriefcaseBusiness, Compass
} from "lucide-react";

type Page = "Home" | "Projects" | "Data Lab" | "Skills" | "About" | "Resume" | "Contact";
type Project = {
  id:string; title:string; category:string; eyebrow:string; description:string;
  year:string; status:string; stack:string[]; image:string; repo?:string;
  visibility:string; details:string[]; outcome:string; featured?:boolean;
};
const projects:Project[] = [
  {id:"black-testa",title:"BLACK × TESTA",category:"AI & Systems",eyebrow:"PERSONAL AI ECOSYSTEM",description:"A personal AI ecosystem with two complementary assistants: BLACK for local Windows and device workflows, and TESTA for reasoning, research and conversational intelligence.",year:"IN DEVELOPMENT",status:"Coming Soon",stack:["Python","FastAPI","Windows Automation","Computer Vision"],image:"https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1800&q=90&fit=crop" ,visibility:"Private",details:["BLACK is the device and system layer: planned capabilities include voice interaction, wake-word workflows, Windows controls, app/window actions and local file operations.","TESTA is the intelligence layer for conversation, task understanding, research, planning and coding assistance.","The vision workflow is being developed as a hybrid system: local detection first, with online image analysis gated by explicit user approval.","The architecture separates device execution from reasoning so that permissions, privacy controls and system actions can be handled deliberately.","Current status: active development. This portfolio describes the direction and implemented experiments, not a finished commercial product."],outcome:"An ambitious personal assistant ecosystem currently under development.",featured:true},
  {id:"hospital",title:"Hospital Management System",category:"Full-stack",eyebrow:"MANAGEMENT APPLICATION",description:"A team-built hospital management application focused on doctor records, patient enquiries and clearer day-to-day information workflows.",year:"2025",status:"Academic Project",stack:["Python","Django","SQLite3","REST APIs"],image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=90&fit=crop",visibility:"On request",details:["Doctor management screens and structured records help organize core hospital information.","Patient enquiry handling provides a clear workflow for incoming requests.","Doctor availability features make it easier to check current availability information.","Python and Django power the server-side application and business logic, with SQLite3 used for data storage.","Developed collaboratively by a five-member student team and presented at Technoquest."],outcome:"The team secured first place among 50+ teams at Technoquest.",featured:true},
  {id:"laundry",title:"LaundryMart",category:"Full-stack",eyebrow:"CUSTOMER WEB APPLICATION",description:"A full-stack laundry service experience designed around the customer journey: account access, choosing services, placing a booking and following order information.",year:"2026",status:"Private Project",stack:["FastAPI","SQLite","JavaScript","Google Identity","Razorpay"],image:"https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=1600&q=90&fit=crop",visibility:"Private",details:["Separate sign-in and registration screens provide a clear entry point for customers.","Google Identity Services is used for Google sign-in, with identity verification handled by the backend.","The service journey is organized around browsing services, selecting options, reviewing a booking and accessing order information.","FastAPI and SQLite support the application backend and data persistence.","Payment support is being treated as a deployment-sensitive integration and should not be considered production-ready until live configuration and end-to-end tests are complete."],outcome:"A full-stack customer workflow project.",featured:true},
  {id:"uk-music",title:"UK Music Insights",category:"Data & Analytics",eyebrow:"ANALYTICS DASHBOARD",description:"A music-data exploration of the UK Top 50, turning playlist records into an interactive view of chart positions, artists, collaborations and listening patterns.",year:"2026",status:"Public Repository",stack:["Python","Pandas","Streamlit","Data Analysis"],image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1600&q=90&fit=crop",visibility:"Public",repo:"https://github.com/arnavujawane42/uk-music-insights",details:["Loads and explores UK Top 50 playlist data snapshots to understand chart composition over time.","Examines artist credits, repeat appearances, collaborations and release-format patterns.","Includes a data-cleaning workflow to handle duplicate date-position records and improve analysis consistency.","Uses Pandas for data preparation and Streamlit to present an interactive dashboard with filters, charts and CSV export.","The repository includes the project source and setup instructions."],outcome:"A descriptive analytics dashboard built to communicate patterns in a real-world music dataset.",featured:true},
  {id:"nassau",title:"Nassau Candy Factory Optimization",category:"AI & Machine Learning",eyebrow:"MACHINE LEARNING",description:"An applied machine-learning project that estimates shipping lead time and compares factory-assignment scenarios to support operational planning.",year:"2026",status:"Public Repository",stack:["Python","Scikit-learn","Random Forest","Streamlit"],image:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=90&fit=crop",visibility:"Public",repo:"https://github.com/arnavujawane42/nassau-candy-factory-optimization",details:["Prepares operational order and shipping data through cleaning and feature engineering.","Compares regression approaches including Linear Regression, Random Forest and Gradient Boosting.","Builds a shipping lead-time prediction workflow to estimate delivery duration from available order and production features.","Explores factory-assignment scenarios to compare potential operational outcomes.","Presents model outputs and scenario exploration through a Streamlit dashboard."],outcome:"An applied machine-learning project for operational decision support.",featured:true},
  {id:"laundry-web",title:"Laundry Mart Website",category:"Web Development",eyebrow:"RESPONSIVE WEB EXPERIENCE",description:"A responsive front-end concept for a laundry service, focused on presenting offerings clearly and making the booking journey easy to understand.",year:"2025",status:"Academic Project",stack:["HTML","CSS","JavaScript","Responsive UI"],image:"https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=1600&q=90&fit=crop",visibility:"On request",details:["Uses a responsive layout to keep the service experience usable across desktop and mobile screens.","Presents laundry offerings and service information in a clear customer-facing structure.","Includes service selection and a booking-oriented interface flow.","Built with HTML, CSS and JavaScript to demonstrate core front-end implementation and interaction."],outcome:"A front-end project demonstrating practical HTML, CSS and JavaScript skills."}
];
const pages:Page[]=["Home","Projects","Data Lab","Skills","About","Resume","Contact"];
const skillGroups=[
  {title:"Programming",icon:Code2,items:["Python","SQL","JavaScript","C","C++","Java (Basic)","HTML","CSS"]},
  {title:"Data & Analytics",icon:ChartNoAxesCombined,items:["Pandas","NumPy","Matplotlib","Power BI","Microsoft Excel","Data Cleaning","Data Visualization"]},
  {title:"Frameworks & Databases",icon:Database,items:["Django","FastAPI","REST APIs","SQLite3"]},
  {title:"Tools & Concepts",icon:Layers3,items:["Git","GitHub","VS Code","Google Colab","OOP","Debugging","Problem Solving"]}
];
const profiles=[
  {name:"Arnav",role:"THE CREATOR",initial:"A",color:"red",icon:UserRound},
  {name:"Recruiter",role:"PROFESSIONAL VIEW",initial:"R",color:"blue",icon:BriefcaseBusiness},
  {name:"Guest",role:"EXPLORE EVERYTHING",initial:"G",color:"gold",icon:Compass}
];

export default function App(){
  const [entered,setEntered]=useState(false);
  const [profile,setProfile]=useState("Arnav");
  const [page,setPage]=useState<Page>("Home");
  const [active,setActive]=useState<Project|null>(null);
  const [searchOpen,setSearchOpen]=useState(false);
  const [query,setQuery]=useState("");
  const [profileOpen,setProfileOpen]=useState(false);
  const [browseOpen,setBrowseOpen]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);
  const [filter,setFilter]=useState("All");
  const [scrollY,setScrollY]=useState(0);

  useEffect(()=>{const f=()=>setScrollY(window.scrollY);window.addEventListener("scroll",f);return()=>window.removeEventListener("scroll",f)},[]);
  useEffect(()=>{window.scrollTo({top:0,behavior:"instant" as ScrollBehavior})},[page,active,entered]);
  const go=(p:Page)=>{setPage(p);setActive(null);setBrowseOpen(false);setMobileOpen(false);setSearchOpen(false);};
  const openProject=(p:Project)=>{setActive(p);setSearchOpen(false);};
  const filtered=useMemo(()=>projects.filter(p=>(filter==="All"||p.category===filter)&&`${p.title} ${p.category} ${p.description} ${p.stack.join(" ")}`.toLowerCase().includes(query.toLowerCase())),[filter,query]);
  const Card=({p}: {p:Project})=><motion.button className="show-card" onClick={()=>openProject(p)} layout whileHover={{scale:1.12,y:-7}} transition={{duration:.22}} aria-label={`View ${p.title}`}>
    <div className="show-art" style={{backgroundImage:`linear-gradient(0deg,#080808 0%,#08080805 75%),url("${p.image}")`}}>
      <span className="show-status">{p.status}</span><div className="show-card-copy"><small>{p.eyebrow}</small><b>{p.title}</b><span><Play size={12} fill="currentColor"/> View details</span></div>
    </div>
    <div className="show-hover"><div className="hover-actions"><span className="circle-play"><Play size={13} fill="currentColor"/></span><span className="circle-icon"><Info size={14}/></span><span className="hover-status">{p.status}</span></div><b>{p.title}</b><small>{p.category} <i>•</i> {p.year}</small><div className="hover-tags">{p.stack.slice(0,3).map(t=><span key={t}>{t}</span>)}</div></div>
  </motion.button>;

  if(!entered)return <div className="profiles-screen">
    <div className="profile-atmosphere"><span className="profile-orb orb-one"></span><span className="profile-orb orb-two"></span><span className="profile-orb orb-three"></span><span className="profile-grid-glow"></span></div>
    <div className="profiles-top"><a className="netflix-wordmark">ARNAV</a><span>THE DIGITAL SPACE</span></div>
    <main className="profiles-center">
      <div className="profiles-kicker">WELCOME BACK TO MY DIGITAL SPACE</div>
      <h1>Who's watching?</h1>
      <div className="profile-list">{profiles.map(p=>{const ProfileIcon=p.icon;return <button className="profile-tile" key={p.name} onClick={()=>{setProfile(p.name);setEntered(true);go("Home")}}>
        <span className={`profile-avatar ${p.color}`}><span className="avatar-halo"></span><ProfileIcon className="avatar-symbol" strokeWidth={1.65}/><span className="avatar-spark"></span></span>
        <b>{p.name}</b><small>{p.role}</small>
      </button>})}</div>
      <button className="manage-profiles" onClick={()=>{setProfile("Guest");setEntered(true);go("Home")}}>EXPLORE AS GUEST <ArrowRight size={14}/></button>
    </main>
    <div className="profiles-bottom"><span>© 2026 ARNAV UJAWANE</span><span>SOFTWARE · DATA · IDEAS</span></div>
  </div>;

  return <div className="netflix-app">
    <header className={`topbar ${scrollY>30||page!=="Home"||active?"topbar-solid":""}`}>
      <a className="netflix-wordmark" onClick={()=>{go("Home");setActive(null)}}>ARNAV</a>
      <button className={`browse-button ${browseOpen?"browse-active":""}`} onClick={()=>setBrowseOpen(!browseOpen)}>Browse <ChevronDown size={14}/></button>
      <nav className="desktop-nav">{pages.map(p=><button key={p} className={page===p&&!active?"nav-active":""} onClick={()=>go(p)}>{p}</button>)}</nav>
      <div className="topbar-right"><button className="icon-button" aria-label="Search" onClick={()=>setSearchOpen(!searchOpen)}>{searchOpen?<X/>:<Search/>}</button><button className="contact-shortcut" onClick={()=>go("Contact")}>LET'S TALK</button><div className="profile-wrap"><button className="profile-trigger" onClick={()=>setProfileOpen(!profileOpen)}><span className="mini-avatar">{profile.slice(0,1)}</span><ChevronDown size={13}/></button>{profileOpen&&<div className="profile-dropdown">{profiles.filter(p=>p.name!==profile).map(p=><button key={p.name} onClick={()=>{setProfile(p.name);setProfileOpen(false);go("Home")}}><span className={`mini-avatar ${p.color}`}>{p.initial}</span>{p.name}</button>)}<button onClick={()=>{setProfileOpen(false);setEntered(false);setActive(null)}}>Switch profile</button><button onClick={()=>go("About")}>About Arnav</button><button onClick={()=>go("Contact")}>Contact</button><button className="dropdown-signout" onClick={()=>{setEntered(false);setProfileOpen(false);setActive(null)}}>Exit profile</button></div>}</div><button className="mobile-menu" onClick={()=>setMobileOpen(!mobileOpen)}><Menu/></button></div>
      {browseOpen&&<div className="browse-menu">{pages.map(p=><button key={p} onClick={()=>go(p)}>{p}</button>)}</div>}
      {mobileOpen&&<div className="mobile-nav">{pages.map(p=><button key={p} onClick={()=>go(p)}>{p}</button>)}</div>}
      {searchOpen&&<div className="search-panel"><Search size={19}/><input autoFocus value={query} onChange={e=>{setQuery(e.target.value);setPage("Projects");setActive(null)}} placeholder="Titles, projects, technologies..."/><button onClick={()=>{setQuery("");setSearchOpen(false)}}><X size={18}/></button></div>}
    </header>

    <AnimatePresence mode="wait">
    {active?<motion.main key="detail" className="title-detail" initial={{opacity:0,y:18,scale:.995}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-12}} transition={{duration:.32,ease:[.22,1,.36,1]}}>
      <div className="detail-hero" style={{backgroundImage:`linear-gradient(90deg,#080808 0%,#080808d9 38%,#08080824 100%),linear-gradient(0deg,#080808 0%,transparent 55%),url("${active.image}")`}}>
        <button className="detail-back" onClick={()=>setActive(null)}><ArrowLeft size={16}/> BACK TO BROWSE</button>
        <div className="detail-hero-copy"><div className="detail-brand">ARNAV <span>ORIGINAL PROJECT</span></div><small>{active.eyebrow}</small><h1>{active.title}</h1><div className="detail-meta"><b>{active.year}</b><span>{active.status}</span><span>{active.category}</span><span>{active.visibility}</span></div><p>{active.description}</p><div className="detail-buttons">{active.repo&&<a href={active.repo} target="_blank" rel="noreferrer" className="detail-play"><Github size={17}/> View Repository</a>}<button className="detail-more" onClick={()=>go("Contact")}><Info size={17}/> Ask about project</button></div></div>
      </div>
      <section className="detail-lower"><div className="detail-main"><h2>About this project</h2><p className="detail-outcome">{active.outcome}</p><ul>{active.details.map(x=><li key={x}>{x}</li>)}</ul></div><aside className="detail-side"><h3>Technologies</h3><div className="detail-stack">{active.stack.map(x=><span key={x}>{x}</span>)}</div><hr/><h3>Project information</h3><p><b>Status</b><span>{active.status}</span></p><p><b>Visibility</b><span>{active.visibility}</span></p><hr/><h3>Source code</h3>{active.repo?<a className="repo-access-link" href={active.repo} target="_blank" rel="noreferrer"><Github size={15}/> Open project repository <ArrowUpRight size={14}/></a>:<p className="repo-private-note">This project repository is private or not published. Contact me to discuss access or a walkthrough.</p>}</aside></section>
      <section className="detail-recommend"><h2>More like this</h2><div className="rail-track">{projects.filter(p=>p.id!==active.id).map(p=><Card p={p}/>)}</div></section>
    </motion.main>:<motion.main key={page} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.28,ease:[.22,1,.36,1]}}>
      {page==="Home"&&<>
        <section className="featured-hero about-hero">
          <div className="about-hero-glow"></div>
          <img className="hero-portrait" src="/arnav-hero-cutout.png" alt="Portrait of Arnav" />
          <div className="featured-content">
            <div className="featured-brand"><span className="n-mark">A</span> ARNAV <i>THE DIGITAL SPACE</i></div>
            <div className="featured-kicker">BCA STUDENT · DEVELOPER · DATA ENTHUSIAST</div>
            <h1 className="about-hero-title">HELLO,<br/><em>I'M ARNAV.</em></h1>
            <div className="featured-facts"><span className="match">● OPEN TO INTERNSHIPS</span><span>NAGPUR, INDIA</span><span>2026</span></div>
            <p>I build digital experiences, explore data, and turn curious ideas into practical technology. I'm interested in full-stack development, analytics and intelligent systems.</p>
            <div className="featured-actions"><button className="play-action" onClick={()=>go("Projects")}><Play size={17} fill="currentColor"/> Explore projects</button><button className="info-action" onClick={()=>go("About")}><Info size={18}/> More about me</button></div>
          </div>
          <div className="hero-side-note"><span>SOFTWARE · DATA · IDEAS</span><b>ARNAV UJAWANE</b></div>
        </section>
        <section className="browse-content">
          <div className="continue-row"><div><span className="content-kicker">YOUR COLLECTION</span><h2>Continue exploring, {profile}</h2></div><button onClick={()=>go("Projects")}>Explore all <ArrowRight size={15}/></button></div>
          <Rail title="AI & intelligent systems" subtitle="Experiments in personal AI, automation and machine learning" items={projects.filter(p=>p.category==="AI & Systems")} onOpen={openProject}/>
          <Rail title="Data & analytics" subtitle="Finding patterns and communicating useful insights" items={projects.filter(p=>["Data & Analytics","AI & Machine Learning"].includes(p.category))} onOpen={openProject}/>
          <Rail title="Websites & applications" subtitle="Digital products, interfaces and customer workflows" items={projects.filter(p=>["Full-stack","Web Development"].includes(p.category))} onOpen={openProject}/>
        </section>
      </>}
      {page==="Projects"&&<section className="browse-page"><div className="page-hero"><small>THE COMPLETE LIBRARY</small><h1>Explore <em>projects.</em></h1><p>Browse applications, experiments and ideas across software, analytics and AI.</p></div><div className="catalog-filters"><div className="catalog-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects or technologies"/></div><div className="filter-list">{["All","Full-stack","Data & Analytics","AI & Machine Learning","AI & Systems","Web Development"].map(x=><button className={filter===x?"chosen":""} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div></div><div className="catalog-grid">{filtered.map(p=><Card p={p}/>)}</div>{filtered.length===0&&<p className="empty-state">No titles found. Try another search.</p>}</section>}
      {page==="Data Lab"&&<section className="browse-page"><div className="page-hero"><small>DATA & INTELLIGENCE</small><h1>The <em>Data Lab.</em></h1><p>Exploration, prediction and decision support through real-world datasets.</p></div><div className="catalog-grid">{projects.filter(p=>["Data & Analytics","AI & Machine Learning"].includes(p.category)).map(p=><Card p={p}/>)}</div></section>}
      {page==="Skills"&&<section className="browse-page"><div className="page-hero"><small>TOOLS OF THE TRADE</small><h1>Skills & <em>toolkit.</em></h1><p>A practical toolkit developed through coursework, projects and continuous learning.</p></div><div className="skill-grid">{skillGroups.map(g=><article><g.icon/><h2>{g.title}</h2><div>{g.items.map(x=><span key={x}>{x}</span>)}</div></article>)}</div></section>}
      {page==="About"&&<section className="browse-page"><div className="page-hero"><small>THE PERSON BEHIND THE PROJECTS</small><h1>Curiosity drives<br/><em>the build.</em></h1></div><div className="about-grid"><div className="about-monogram">A<span>.</span></div><div><h2>Hello, I'm Arnav.</h2><p className="about-lead">I'm a BCA student at GH Raisoni Skill Tech University, Nagpur, interested in building useful software and making data easier to understand.</p><p>My work spans Python and Django applications, responsive web experiences, data analytics and machine learning experiments. I enjoy learning by building, collaborating and solving practical problems.</p><div className="achievement"><Trophy/><div><b>Technoquest · 1st Place</b><p>Led a five-member student team on a Python-Django application, earning first place among 50+ teams.</p></div></div><div className="achievement"><GraduationCap/><div><b>Bachelor of Computer Applications</b><p>GH Raisoni Skill Tech University · 2024–2028 · CGPA 8.04</p></div></div></div></div></section>}
      {page==="Resume"&&<section className="browse-page"><div className="page-hero"><small>EXPERIENCE & EDUCATION</small><h1>My <em>resume.</em></h1><p>A quick overview of my education, projects and technical toolkit.</p></div><div className="resume-card"><div><small>ARNAV UJAWANE</small><h2>Full-stack Developer<br/>& Data Analyst</h2><p>BCA student · Nagpur, Maharashtra</p><div className="detail-stack"><span>Python · Django · SQL</span><span>Data Analytics · Power BI</span><span>JavaScript · HTML · CSS</span></div></div><div><b>Resume PDF</b><p>Request the latest copy directly.</p><button className="play-action" onClick={()=>go("Contact")}>Request resume <ArrowUpRight size={15}/></button></div></div><div className="education-grid"><article><small>2024 — 2028</small><h3>GH Raisoni Skill Tech University</h3><p>Bachelor of Computer Applications · CGPA 8.04</p></article><article><small>2023 — 2024</small><h3>Lords Public School</h3><p>Higher Secondary Certificate</p></article><article><small>2021 — 2022</small><h3>GNT Convent</h3><p>Secondary School Certificate</p></article></div></section>}
      {page==="Contact"&&<section className="contact-page"><small>LET'S BUILD SOMETHING</small><h1>Have an idea?<br/><em>Let's talk.</em></h1><p>Open to internship opportunities, collaborations and conversations about technology.</p><a href="mailto:arnavujawane42@gmail.com" className="play-action"><Mail size={17}/> Email Arnav <ArrowUpRight size={15}/></a><div className="social-links"><a href="https://github.com/arnavujawane42" target="_blank" rel="noreferrer"><Github/> GitHub</a><a href="https://linkedin.com/in/arnavujawane04" target="_blank" rel="noreferrer"><Linkedin/> LinkedIn</a><a href="mailto:arnavujawane42@gmail.com"><Mail/> Email</a></div><span>NAGPUR, INDIA · ENGLISH / HINDI / MARATHI</span></section>}
    </motion.main>}
    </AnimatePresence>
    <footer className="site-footer"><a className="netflix-wordmark" onClick={()=>go("Home")}>ARNAV</a><span>© 2026 ARNAV UJAWANE · THE DIGITAL SPACE</span><div><a href="https://github.com/arnavujawane42" target="_blank" rel="noreferrer">GITHUB</a><a href="mailto:arnavujawane42@gmail.com">CONTACT</a></div></footer>
  </div>;
}
function Rail({title,subtitle,items,onOpen}:{title:string;subtitle:string;items:Project[];onOpen:(p:Project)=>void}){
  const [offset,setOffset]=useState(0);
  return <section className="content-rail"><div className="rail-title"><div><h2>{title}</h2><p>{subtitle}</p></div><div className="rail-arrows"><button onClick={()=>setOffset(Math.max(0,offset-1))}><ArrowLeft size={15}/></button><button onClick={()=>setOffset(Math.min(Math.max(0,items.length-3),offset+1))}><ArrowRight size={15}/></button></div></div><div className="rail-window"><div className="rail-track" style={{transform:`translateX(calc(${offset} * (var(--card-width) + var(--card-gap)) * -1))`}}>{items.map(p=><RailCard key={p.id} p={p} onOpen={onOpen}/>)}</div></div></section>
}
function RailCard({p,onOpen}:{p:Project;onOpen:(p:Project)=>void}){
  const [show,setShow]=useState(false);
  return <div className={`rail-card-wrap ${show?"is-hovered":""}`} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
    <button className="rail-card" onClick={()=>onOpen(p)} aria-label={`Open ${p.title}`}>
      <div className="rail-image" style={{backgroundImage:`linear-gradient(0deg,#080808d9 0%,#08080805 72%),url("${p.image}")`}}>
        <span>{p.status}</span><b>{p.title}</b>
      </div>
    </button>
    {show&&<div className="rail-hover-card" role="group" aria-label={`${p.title} preview`}>
      <div className="rail-hover-art" style={{backgroundImage:`linear-gradient(0deg,#181818 0%,transparent 62%),url("${p.image}")`}}>
        <span className="preview-status">{p.status}</span>
      </div>
      <div className="rail-hover-body">
        <div className="rail-hover-actions">
          <button className="hover-play" onClick={()=>onOpen(p)} aria-label="Open project"><Play size={14} fill="currentColor"/></button>
          <button className="hover-info" onClick={()=>onOpen(p)} aria-label="More information"><Info size={15}/></button>
          <span>{p.status}</span>
        </div>
        <b>{p.title}</b>
        <small>{p.category} <i>•</i> {p.year}</small>
        <p>{p.description}</p>
        <div className="hover-tags">{p.stack.slice(0,3).map(t=><span key={t}>{t}</span>)}</div>
        <div className="rail-repo-row">{p.repo?<a href={p.repo} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}><Github size={13}/> Open GitHub repository <ArrowUpRight size={13}/></a>:<span>Private / unpublished source · request access</span>}</div>
      </div>
    </div>}
  </div>;
}
