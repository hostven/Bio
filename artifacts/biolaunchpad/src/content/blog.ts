export type Block =
  | { t: 'p'; x: string }
  | { t: 'h'; x: string; n?: string }
  | { t: 'ul'; items: string[] }
  | { t: 'note'; x: string };

export type Category = 'Healthtech explained' | 'Clinician innovators' | 'Building products' | 'Inside Biolaunchpad';

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: Category;
  published: string; // ISO, from the original blog index
  updated: string; // ISO, from the original article page
  blocks: Block[];
};

export const CATEGORIES: Category[] = ['Healthtech explained', 'Clinician innovators', 'Building products', 'Inside Biolaunchpad'];

export const ARTICLES: Article[] = [
  {
    slug: 'what-are-software-as-medical-devices-samds',
    title: 'What are Software as Medical Devices (SaMDs)',
    dek: 'You may have heard the term Software as a Medical Device. Here is what it means, how it works and why it matters for healthcare.',
    category: 'Healthtech explained',
    published: '2024-12-18',
    updated: '2024-12-25',
    blocks: [
      { t: 'p', x: 'In a world shaped by technology, the phrase "Software as a Medical Device", or SaMD, comes up more and more. So what exactly is a SaMD, and how is it changing healthcare? Here is a quick, plain-language guide.' },
      { t: 'h', x: 'Software with a medical purpose' },
      { t: 'p', x: 'SaMD stands for Software as a Medical Device. These are not ordinary apps. They are digital tools built for a specific medical purpose, working alongside doctors to help keep patients healthy.' },
      { t: 'p', x: 'They can support a wide range of medical needs, from monitoring heart rate to managing blood sugar levels or tracking sleep patterns. The aim is to improve health and wellbeing.' },
      { t: 'note', x: 'A software application counts as a SaMD when it performs its medical function without being part of a hardware medical device, and when it is aimed at individual patients for a specific condition.' },
      { t: 'h', x: 'How a SaMD works in practice' },
      { t: 'p', x: 'Imagine you have a heart condition. Instead of a physical device, your doctor recommends a SaMD. The software monitors your heart rhythm, records any irregularities and sends that information directly to your healthcare provider. In effect, it puts a portable monitor in your phone.' },
      { t: 'h', x: 'Why SaMDs matter' },
      { t: 'p', x: 'SaMDs are helping make healthcare more accessible, more personalised and more efficient. You do not need to be technical to use them. They are designed to be easy to use and widely available.' },
      { t: 'ul', items: ['Help people manage their health more effectively', 'Can reduce the number of medical appointments needed', 'Save time and money', 'Support better overall wellbeing'] },
      { t: 'h', x: 'SaMD and SiMD: what is the difference?' },
      { t: 'p', x: 'You may also hear the term SiMD, which stands for Software in a Medical Device. This is software that runs as part of a physical medical device, the engine inside the hardware. A SaMD, by contrast, does its medical job on its own, without being part of the hardware.' },
      { t: 'p', x: 'So the next time you hear SaMD and SiMD, you will know they are not just jargon. They describe digital tools that are changing how healthcare is delivered.' },
    ],
  },
  {
    slug: 'the-importance-of-data-in-healthcare',
    title: 'The Importance of Data in Healthcare',
    dek: 'Data quietly shapes how we care for patients, conduct research and build new solutions. Here is why it matters, and why it must be handled ethically.',
    category: 'Healthtech explained',
    published: '2024-12-05',
    updated: '2024-12-25',
    blocks: [
      { t: 'p', x: 'Healthcare is always changing, and one of its most important forces often goes unnoticed. It shapes how we care for patients, how research is done and how new solutions are developed.' },
      { t: 'p', x: 'That force is data. This article looks at the role data plays in healthcare and how it is changing patient care, research and product development.' },
      { t: 'p', x: 'Data is more than numbers. It is patient histories, test results and insight into how diseases behave. In short, data holds the past, present and future of healthcare.' },
      { t: 'h', n: '01', x: 'Personalised care' },
      { t: 'p', x: 'Data makes personalised care possible. It lets wearable fitness trackers give real-time health insights, makes telemedicine more effective and enables remote patient monitoring. Used well, it puts patients at the centre of their own care.' },
      { t: 'h', n: '02', x: 'Health management' },
      { t: 'p', x: 'Data is not only for diagnosis. It also helps people manage their health day to day: controlling chronic conditions, sticking to medication plans and making informed choices.' },
      { t: 'h', n: '03', x: 'Precision medicine' },
      { t: 'p', x: 'By examining an individual patient\'s data, including genetics, lifestyle and health records, doctors can build treatment plans tailored to that patient\'s particular needs.' },
      { t: 'h', n: '04', x: 'Predictive analytics' },
      { t: 'p', x: 'By analysing historical data, patterns and trends, healthcare professionals can spot people at risk of future health problems and intervene earlier. Early action can save lives and reduce the cost of care.' },
      { t: 'h', n: '05', x: 'Drug discovery' },
      { t: 'p', x: 'Data speeds up drug discovery. It helps identify promising drug candidates, predict how effective they may be and simplify clinical trials, which can lead to faster, more accessible treatments.' },
      { t: 'h', x: 'The ethical side of data' },
      { t: 'p', x: 'As the role of data in healthcare grows, so does the responsibility that comes with it. Respecting patient privacy and confidentiality is essential, and data must always be used ethically.' },
      { t: 'p', x: 'Data guides healthcare toward care that is more precise, more personal and more proactive. It drives research, speeds up drug discovery and widens access to care. As healthcare becomes more data-driven, we have to make sure that change stays ethical and focused on patients.' },
    ],
  },
  {
    slug: 'why-doctors-face-challenges-in-healthcare-tech-innovation',
    title: 'Why Doctors Face Challenges in Healthcare Tech Innovation',
    dek: 'Doctors hold deep insight into what healthcare needs, yet few turn that insight into technology products. Seven reasons the gap persists.',
    category: 'Clinician innovators',
    published: '2024-11-26',
    updated: '2024-12-25',
    blocks: [
      { t: 'p', x: 'Healthcare technology is advancing quickly, and the need for new solutions has never been greater.' },
      { t: 'p', x: 'Yet something often stops doctors from turning their expertise and ideas into technology products or startups. Despite deep knowledge and long experience, many physicians struggle to step into healthcare tech innovation. Why does this gap persist?' },
      { t: 'h', n: '01', x: 'The engineering advantage is missing' },
      { t: 'p', x: 'Engineers usually have an intuitive understanding of technology. They speak the language of code, circuits and algorithms. Doctors have spent years mastering the human body, and technology can feel like a foreign language. Bridging that gap is hard.' },
      { t: 'h', n: '02', x: 'A lifelong commitment to practice' },
      { t: 'p', x: 'Doctors are deeply committed to patient care. Years of study, internship and practice make medicine a calling, not just a job. In some professions moving into entrepreneurship is fairly simple. Doctors cannot just step away from practice to build a startup. Their patients rely on them, and their expertise is constantly in demand.' },
      { t: 'h', n: '03', x: 'When experience resists change' },
      { t: 'p', x: 'Doctors invest enormous time and effort to reach their positions, and they understand the healthcare system from the inside. That insight into its strengths and weaknesses is invaluable. But long experience can also become a barrier. A "this is how it has always been done" mindset can quietly hold back new ideas.' },
      { t: 'h', n: '04', x: 'Lost in translation' },
      { t: 'p', x: 'Tech startups have their own vocabulary, full of jargon and acronyms. Doctors already work in a complex medical language, and the extra layer of tech terms can be off-putting enough to stop them from trying.' },
      { t: 'h', n: '05', x: 'The weight of past experiences' },
      { t: 'p', x: 'Bad experiences cast a long shadow. Many doctors have tried a tech venture and been let down: a developer who did not deliver, an app that never launched, or expectations that were never met. Setbacks like these make people hesitant to try again.' },
      { t: 'h', n: '06', x: 'The stereotype: "tech startups are not for us"' },
      { t: 'p', x: 'Tech startups are widely seen as the territory of tech-savvy people, while doctors are seen as caregivers rather than entrepreneurs. The assumption that doctors lack the skills or mindset for tech innovation can be discouraging.' },
      { t: 'h', n: '07', x: 'Tradition and hierarchy' },
      { t: 'p', x: 'Tradition and hierarchy run deep in healthcare. From medical school onward, the path is clear: learn, follow, then lead. That mindset can discourage doctors from venturing into unfamiliar territory such as tech innovation.' },
      { t: 'h', x: 'Conclusion' },
      { t: 'p', x: 'These barriers are real, but they can be overcome. By recognising them and building support systems that provide resources, guidance and mentorship, we can help doctors turn their ideas into real-world solutions. Healthcare tech innovation is not only for the tech-savvy. It is for anyone who wants to make a difference in medicine, one idea at a time.' },
    ],
  },
  {
    slug: 'navigating-healthtechs-unique-challenges-when-engineers-take-on-medical-product-development',
    title: "Navigating HealthTech's Unique Challenges: When Engineers Take on Medical Product Development",
    dek: 'Engineers can bring transformative ideas to healthcare, but medical products come with challenges unlike other industries. Ten to plan for.',
    category: 'Building products',
    published: '2024-11-11',
    updated: '2024-12-25',
    blocks: [
      { t: 'p', x: 'Engineers have the potential to bring transformative solutions to healthcare.' },
      { t: 'p', x: 'But when they start developing medical products, they often run into a set of challenges that can feel unfamiliar. Here are ten of them.' },
      { t: 'h', n: '01', x: 'Binary thinking versus a multifaceted field' },
      { t: 'p', x: 'Engineers are used to thinking in clear terms: zeros and ones, right and wrong. Healthcare is full of nuance, ranges and competing considerations. Precision here is less about absolutes and more about managing delicate balances, intricate ranges and special cases.' },
      { t: 'h', n: '02', x: 'A complex regulatory landscape' },
      { t: 'p', x: 'Healthcare is heavily regulated, with demanding compliance standards. Understanding and following these regulations is essential so that products meet strict requirements for safety and quality.' },
      { t: 'h', n: '03', x: 'Real-world practicality' },
      { t: 'p', x: 'Engineers are often drawn to technically advanced solutions that do not always work in the real world for doctors and patients. The goal is a product that fits into clinical practice without disrupting it.' },
      { t: 'h', n: '04', x: 'User-centred design' },
      { t: 'p', x: 'Prioritising technical sophistication over usability can produce products that are too complex and miss what doctors and patients actually need. The focus should be simplicity, ease of use and solving specific pain points.' },
      { t: 'h', n: '05', x: 'Multidisciplinary collaboration' },
      { t: 'p', x: 'Healthcare depends on collaboration between doctors, engineers and other experts, and bridging those disciplines can be difficult. Successful medical product development needs engineers working closely with medical professionals.' },
      { t: 'h', n: '06', x: 'Ethics and privacy' },
      { t: 'p', x: 'Ethical and privacy concerns are central in healthcare and easy to overlook. Protecting patient data and maintaining confidentiality are non-negotiable, and must be built in throughout development for compliance and security.' },
      { t: 'h', n: '07', x: 'Budget realities' },
      { t: 'p', x: 'Medical product development can be expensive, and the cost is often underestimated, which leads to overruns and delays. A clear view of budget constraints and a realistic financial plan are essential.' },
      { t: 'h', n: '08', x: 'Clinical validation' },
      { t: 'p', x: 'Engineers may not have the resources or expertise to run clinical trials and prove that a product works. Working with medical professionals and institutions on clinical validation is a pivotal step.' },
      { t: 'h', n: '09', x: 'Long development cycles' },
      { t: 'p', x: 'Engineers from fast-moving industries may find healthcare timelines slow. Patience and long-term commitment are crucial in this field.' },
      { t: 'h', n: '10', x: 'User training and support' },
      { t: 'p', x: 'Training and ongoing support for doctors and other users are easy to underestimate. A product is only adopted in clinical settings when users feel comfortable and competent using it.' },
    ],
  },
  {
    slug: 'healthcare-product-development-how-biolaunchpad-makes-biotech-innovation-affordable-and-efficient',
    title: 'Healthcare Product Development: How Biolaunchpad Makes Biotech Innovation Affordable and Efficient',
    dek: 'The path to market in biotech is long, costly and heavily regulated. This is the operating approach Biolaunchpad describes for keeping it efficient.',
    category: 'Inside Biolaunchpad',
    published: '2024-10-22',
    updated: '2024-12-25',
    blocks: [
      { t: 'p', x: 'In biotech, the road to market can be daunting and expensive. Development cycles are long, processes are costly and regulation is complex.' },
      { t: 'p', x: 'Biolaunchpad aims to make biotech innovation more accessible and cost-effective. This is how the approach is designed to work.' },
      { t: 'h', n: '01', x: 'Shared resources across projects' },
      { t: 'ul', items: ['Because Biolaunchpad manages several product development projects, it can assemble specialised teams for each project without building a separate dedicated team for every product.', 'Legal, intellectual property and regulatory specialists oversee each stage of development, with the aim of avoiding costly delays and obstacles.'] },
      { t: 'h', n: '02', x: 'Continuous development' },
      { t: 'ul', items: ['Working with teams and experts in different locations allows work to continue around the clock, with the aim of shortening turnaround times.', 'Faster development can mean quicker time to market and lower costs.'] },
      { t: 'h', n: '03', x: 'Development based in India' },
      { t: 'ul', items: ['Basing development teams in regions such as India can significantly reduce development costs while giving access to strong talent.', 'Making careful use of people and other resources helps keep projects affordable without compromising quality.'] },
      { t: 'h', n: '04', x: 'Quality alongside efficiency' },
      { t: 'ul', items: ['The goal is not only lower cost but also high standards of quality.', 'Streamlined processes, cost-effective choices and a commitment to quality are the principles behind this approach.'] },
      { t: 'note', x: 'Timelines and costs for any specific product depend on its scope, technology and regulatory pathway, and are discussed project by project.' },
    ],
  },
  {
    slug: 'beyond-accelerators-and-incubators-how-biolaunchpad-is-revolutionising-healthcare-entrepreneurship',
    title: 'Beyond Accelerators and Incubators: How Biolaunchpad is Revolutionising Healthcare Entrepreneurship',
    dek: 'Accelerators and incubators support businesses. Biolaunchpad takes on end-to-end product development with healthcare professionals as partners and shareholders.',
    category: 'Inside Biolaunchpad',
    published: '2024-10-08',
    updated: '2024-12-25',
    blocks: [
      { t: 'p', x: 'Biolaunchpad differs from traditional accelerators and incubators in a few important ways.' },
      { t: 'p', x: 'Rather than only supporting, assisting or guiding, Biolaunchpad takes on the end-to-end product development project, with doctors as business partners and shareholders. Doctors do not need to form teams or run companies. That is the core difference from incubators and accelerators that support existing businesses.' },
      { t: 'h', x: 'Going beyond product support' },
      { t: 'p', x: 'Accelerators and incubators often focus on supporting a specific product or idea. That is valuable, but it leaves a gap. Many healthcare innovations need more than a product: they need a clear route to market, an understanding of regulation and a way through a complex healthcare landscape. Biolaunchpad takes on the whole product development project, with doctors as partners and shareholders.' },
      { t: 'h', x: 'Addressing the regulatory challenge' },
      { t: 'p', x: 'Demanding regulatory requirements are one of the biggest hurdles for healthcare entrepreneurs. The landscape is complex and keeps changing, and it is a common reason promising ideas are never realised. Biolaunchpad includes regulatory services as part of its end-to-end approach, so innovators understand and work toward the regulations that apply to their product.' },
      { t: 'h', x: 'Expanding beyond medicine' },
      { t: 'p', x: 'Biolaunchpad is not only for doctors. It supports professionals across healthcare, including physiotherapists, nurses, dentists, pharmacists and veterinarians. There is enormous potential for innovation in these fields, and drawing on their knowledge widens the range of problems that can be solved.' },
      { t: 'h', x: 'Real pain points from real experts' },
      { t: 'p', x: 'Some startups go looking for problems to solve. Biolaunchpad works with healthcare professionals who face those problems daily. They do not need to search for pain points; they live them. That makes it more likely the resulting products address issues that genuinely matter in healthcare.' },
      { t: 'h', x: 'The reluctance to leave practice' },
      { t: 'p', x: 'One of the biggest obstacles in healthcare entrepreneurship is that professionals are understandably reluctant to leave established practices. In many jobs, you can try a startup and find another job if it fails. Leaving a medical practice is a far bigger decision, with financial stability, years of commitment and patient wellbeing at stake.' },
      { t: 'p', x: 'Biolaunchpad is designed around this reality. Healthcare professionals can pursue entrepreneurship without abandoning their careers, balancing clinical work with building a product.' },
      { t: 'h', x: 'A launchpad, not just an incubator' },
      { t: 'p', x: 'Biolaunchpad aims to be a true launchpad: managing the product development process, with doctors involved as business partners and shareholders, offering support from development to regulatory guidance, and welcoming professionals beyond medicine. The approach is built on real expertise and on the barriers that have long held healthcare innovation back.' },
    ],
  },
  {
    slug: 'biolaunchpad-mission-and-the-problems-we-aim-to-solve',
    title: 'Biolaunchpad Mission and the Problems We Aim to Solve',
    dek: 'Our mission is to help healthcare professionals become entrepreneurs without abandoning clinical practice. These are the problems at the heart of that work.',
    category: 'Inside Biolaunchpad',
    published: '2024-09-18',
    updated: '2024-12-25',
    blocks: [
      { t: 'p', x: 'Among countless startups and new solutions, Biolaunchpad is focused on a specific set of challenges in healthcare.' },
      { t: 'p', x: 'Our mission is to help healthcare professionals become successful entrepreneurs without abandoning their clinical practice. Here are the problems we are trying to solve, and how we approach them.' },
      { t: 'h', n: '01', x: 'The healthcare entrepreneurship gap' },
      { t: 'p', x: 'There is a gap between healthcare professionals and the world of entrepreneurship. Startups and new technologies are everywhere, yet healthcare experts, especially doctors and those with advanced medical degrees, often find themselves at a crossroads. They have unique insight from years of diagnosing and treating patients, but pursuing an idea usually means leaving an established practice.' },
      { t: 'h', n: '02', x: 'Balancing clinical work and innovation' },
      { t: 'p', x: 'We believe doctors should be able to balance clinical responsibilities with entrepreneurship. The difficulty of striking that balance has stopped many from trying. Biolaunchpad aims to offer a flexible route so innovators can keep practising while their projects develop.' },
      { t: 'h', n: '03', x: 'Bridging the innovation divide' },
      { t: 'p', x: 'Healthcare has seen remarkable technological progress, and there is room for much more. Many healthcare professionals have practical insight into problems that technology could solve, but few routes to work with the entrepreneurial world. Biolaunchpad acts as a bridge, connecting them with the resources and mentorship needed to turn ideas into reality.' },
      { t: 'h', n: '04', x: 'Filling the gaps in MedTech' },
      { t: 'p', x: 'Fields such as fintech and artificial intelligence often take the spotlight, while MedTech and medical devices can be overlooked. Doctors, with deep knowledge of medicine and the biosciences, could drive major MedTech advances, but lack established platforms to pursue them. Biolaunchpad is dedicated to helping these innovations grow.' },
      { t: 'h', n: '05', x: 'Collaboration and support' },
      { t: 'p', x: 'Our approach goes beyond funding. We offer mentorship, guidance and access to a network of industry connections, because collaboration and a supportive ecosystem are essential to building healthcare solutions.' },
      { t: 'h', n: '06', x: 'Our vision' },
      { t: 'p', x: 'We want to build an ecosystem where healthcare professionals can thrive as entrepreneurs and bring their innovations to market, and to become the platform medical and allied sciences innovators turn to first.' },
      { t: 'p', x: 'By helping healthcare professionals pursue their ideas, we believe we can drive innovation, improve patient care and contribute to a better future for healthcare. If that resonates, we would like to hear from you.' },
    ],
  },
  {
    slug: 'why-medical-doctors-would-excel-as-entrepreneurs',
    title: 'Why Medical Doctors Would Excel as Entrepreneurs',
    dek: 'A growing number of doctors are exploring entrepreneurship. Six qualities that make them well suited to building healthcare businesses.',
    category: 'Clinician innovators',
    published: '2024-09-04',
    updated: '2024-12-25',
    blocks: [
      { t: 'p', x: 'Among the many people starting new businesses, one group is becoming increasingly visible: doctors. We usually picture them in white coats with stethoscopes, but a growing number of medical professionals are exploring entrepreneurship alongside or beyond their traditional roles.' },
      { t: 'p', x: 'So what makes doctors well suited to entrepreneurship? Here are the key factors.' },
      { t: 'h', n: '01', x: 'The medical advantage' },
      { t: 'p', x: 'Years of rigorous education and clinical experience give doctors a deep understanding of how healthcare works. That perspective helps them spot gaps in the system and develop solutions for real patient needs.' },
      { t: 'p', x: 'Countless hours diagnosing and treating patients give doctors first-hand insight into the challenges patients and health systems face. That knowledge helps them create products and services that are practical and grounded in sound medical principles, and ultimately more effective and patient-centred.' },
      { t: 'h', n: '02', x: 'Natural problem solvers' },
      { t: 'p', x: 'Doctors approach every case methodically and analytically. Beyond diagnosis and treatment, many are driven to solve wider problems, from managing chronic disease to improving the overall patient experience.' },
      { t: 'h', n: '03', x: 'Empathy as a driving force' },
      { t: 'p', x: 'Doctors are trained to understand how others feel. In business, and especially in healthcare, that empathy builds trust and helps create solutions that genuinely care about patient wellbeing.' },
      { t: 'h', n: '04', x: 'Comfortable with rules' },
      { t: 'p', x: 'Doctors work within complex regulatory environments every day. That experience helps them navigate the regulations that govern healthcare businesses, and keeps quality standards and compliance front of mind.' },
      { t: 'h', n: '05', x: 'A lifelong love of learning' },
      { t: 'p', x: 'Doctors keep learning throughout their careers to stay current with medical advances. That habit carries over into business, where they readily take on new technologies, research and industry trends so their ventures can keep up with changing healthcare needs.' },
      { t: 'h', n: '06', x: 'People skills and patience' },
      { t: 'p', x: 'Years of patient interaction build strong people skills and patience. These help in building relationships with customers, investors and partners, where trust and clear communication are crucial.' },
      { t: 'h', x: 'Doctorpreneurs: innovating healthcare' },
      { t: 'p', x: 'Doctors are showing they can be creators as well as healers, helping to shape the future of healthcare. So if you see a doctor at a startup meeting, do not be surprised. They are not just writing prescriptions; they are helping rewrite healthcare entrepreneurship.' },
    ],
  },
];

export const findArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

export function readingMinutes(a: Article) {
  const words = a.blocks.reduce((n, b) => n + ('x' in b ? b.x : b.items.join(' ')).split(/\s+/).length, 0);
  return Math.max(1, Math.round(words / 220));
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
