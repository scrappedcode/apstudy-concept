export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Unit {
  number: number;
  title: string;
  weight: string;
  topics: string[];
}

export interface Course {
  id: string;
  name: string;
  banner: string;
  examWeight?: string;
  units: Unit[];
  quiz: QuizQuestion[];
  resources: { label: string; url: string }[];
}

export interface Subject {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
  accentColor: string;
  tagline: string;
  courses: Course[];
}

const RESOURCES_BASE = "https://resources.apstudy.org";

export const SUBJECTS: Subject[] = [
  {
    id: "math",
    name: "Math & CS",
    emoji: "📐",
    gradient: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
    accentColor: "#4F46E5",
    tagline: "Numbers, logic, and beyond",
    courses: [
      {
        id: "ap-precalc",
        name: "AP Precalculus",
        banner: `${RESOURCES_BASE}/images/ap-precalc/precalcbanner.jpg`,
        units: [
          { number: 1, title: "Polynomial & Rational Functions", weight: "30–40%", topics: ["Change", "Rates of Change", "Polynomial Behavior", "Rational Functions", "Asymptotes", "Transformations", "Modeling"] },
          { number: 2, title: "Exponential & Logarithmic Functions", weight: "30–40%", topics: ["Sequences", "Exponential Functions", "Logarithmic Functions", "Inverses", "Equations", "Data Modeling", "Semi-log Plots"] },
          { number: 3, title: "Trigonometric & Polar Functions", weight: "30–40%", topics: ["Periodic Phenomena", "Trig Functions", "Sinusoidal Modeling", "Inverse Trig", "Polar Coordinates", "Rates of Change"] },
          { number: 4, title: "Parameters, Vectors & Matrices", weight: "Not assessed", topics: ["Parametric Functions", "Conics", "Vectors", "Matrices"] },
        ],
        quiz: [
          { q: "Which of the following is the end behavior of f(x) = -3x⁴ + 2x² - 1 as x → +∞?", options: ["f(x) → +∞", "f(x) → -∞", "f(x) → 0", "f(x) → 1"], answer: 1, explanation: "A negative leading coefficient with an even degree means both ends go to -∞." },
          { q: "The graph of f(x) = log₂(x - 3) has a vertical asymptote at:", options: ["x = 0", "x = 2", "x = 3", "x = -3"], answer: 2, explanation: "The argument (x - 3) must be > 0, so x > 3. The vertical asymptote is at x = 3." },
          { q: "Which of the following represents an exponential growth model?", options: ["f(x) = 5 · (0.8)ˣ", "f(x) = 5 · (1.3)ˣ", "f(x) = -2 · (1.1)ˣ", "f(x) = 3x²"], answer: 1, explanation: "Exponential growth requires a base > 1. f(x) = 5 · (1.3)ˣ has base 1.3 > 1." },
          { q: "The period of f(x) = 4sin(2πx/3) is:", options: ["2π", "3", "2π/3", "4"], answer: 1, explanation: "Period = 2π / |b| = 2π / (2π/3) = 3." },
          { q: "If f(x) = 2x + 1 and g(x) = x², then (g ∘ f)(3) =", options: ["25", "49", "13", "7"], answer: 1, explanation: "f(3) = 7, then g(7) = 49." },
          { q: "A function's graph is symmetric about the y-axis. This means the function is:", options: ["Odd", "Even", "Neither", "Periodic"], answer: 1, explanation: "If f(-x) = f(x) for all x, the function is even and symmetric about the y-axis." },
        ],
        resources: [
          { label: "Study Guide", url: `${RESOURCES_BASE}/ap-precalc/study-guide` },
          { label: "Unit 1 MCQ Practice", url: "https://drive.google.com/file/d/1syXdskRZbtuU9-cY1crYoinoHkz7ykji/view" },
          { label: "Unit 2 MCQ+Answers", url: "https://drive.google.com/file/d/1TEARA7aH7vzmmYU2DNcvU4swEdZWNaPe/view" },
          { label: "Review Slides", url: "https://www.canva.com/design/DAGByM6ZzVo/z_nKQo0guMTdgfvQhG1KJA/view" },
        ],
      },
      {
        id: "ap-stats",
        name: "AP Statistics",
        banner: `${RESOURCES_BASE}/images/ap-stats/statsbanner.jpg`,
        units: [
          { number: 1, title: "Exploring One-Variable Data", weight: "15–23%", topics: ["Variables", "Categorical Graphs", "Distributions", "Summary Statistics", "Boxplots", "Normal Distribution"] },
          { number: 2, title: "Exploring Two-Variable Data", weight: "5–7%", topics: ["Scatterplots", "Correlation", "Regression", "Residuals", "Least Squares", "Nonlinearity"] },
          { number: 3, title: "Collecting Data", weight: "12–15%", topics: ["Random Sampling", "Bias", "Experimental Design", "Random Assignment"] },
          { number: 4, title: "Probability & Distributions", weight: "10–20%", topics: ["Probability Rules", "Random Variables", "Binomial Distribution", "Geometric Distribution"] },
          { number: 5, title: "Sampling Distributions", weight: "7–12%", topics: ["Central Limit Theorem", "Bias", "Proportions", "Means"] },
          { number: 6, title: "Inference for Proportions", weight: "12–15%", topics: ["Confidence Intervals", "Hypothesis Tests", "p-value", "Error Types"] },
          { number: 7, title: "Inference for Means", weight: "10–18%", topics: ["t-Intervals", "t-Tests", "Two-Sample", "Paired Data"] },
          { number: 8, title: "Chi-Square Tests", weight: "2–5%", topics: ["Goodness of Fit", "Expected Counts", "Homogeneity", "Independence"] },
          { number: 9, title: "Inference for Slopes", weight: "2–5%", topics: ["Regression Slope", "Confidence Intervals", "Tests for Slopes"] },
        ],
        quiz: [
          { q: "A distribution is described as right-skewed. Which is most likely true?", options: ["Mean < Median", "Mean > Median", "Mean = Median", "IQR = 0"], answer: 1, explanation: "In a right-skewed distribution, the long tail pulls the mean to the right, so mean > median." },
          { q: "Which correlation coefficient indicates the strongest linear relationship?", options: ["r = 0.72", "r = -0.91", "r = 0.05", "r = -0.45"], answer: 1, explanation: "|r| measures strength. |-0.91| = 0.91 is the largest, so it's the strongest relationship." },
          { q: "A study found a p-value of 0.03 with α = 0.05. The correct conclusion is:", options: ["Fail to reject H₀", "Reject H₀", "Accept H₀", "Accept Hₐ"], answer: 1, explanation: "Since p = 0.03 < α = 0.05, we reject H₀. We never 'accept' a hypothesis." },
          { q: "Which sampling method divides the population into groups, then randomly samples from each group?", options: ["Cluster sampling", "Systematic sampling", "Stratified sampling", "Simple random sampling"], answer: 2, explanation: "Stratified sampling divides into strata (groups) and samples from each." },
          { q: "A Type I error occurs when you:", options: ["Fail to reject a true null", "Reject a true null", "Fail to reject a false null", "Reject a false null"], answer: 1, explanation: "Type I error = false positive = rejecting a null hypothesis that is actually true." },
          { q: "The standard deviation of a sampling distribution of x̄ is known as:", options: ["Population standard deviation", "Standard error", "Variance", "Range"], answer: 1, explanation: "The standard deviation of the sampling distribution is called the standard error (SE = σ/√n)." },
        ],
        resources: [
          { label: "Khan Academy Stats", url: "https://www.khanacademy.org/math/ap-statistics" },
          { label: "Fiveable", url: "https://library.fiveable.me/ap-stats" },
        ],
      },
      {
        id: "ap-csp",
        name: "AP Computer Science Principles",
        banner: `${RESOURCES_BASE}/images/ap-precalc/precalcbanner.jpg`,
        units: [
          { number: 1, title: "Creative Development", weight: "10–13%", topics: ["Collaboration", "Program Design", "Iterative Development", "Debugging"] },
          { number: 2, title: "Data", weight: "17–22%", topics: ["Binary", "Compression", "Extracting Information", "Visualizing Data", "Privacy Concerns"] },
          { number: 3, title: "Algorithms & Programming", weight: "30–35%", topics: ["Variables", "Conditionals", "Iteration", "Procedures", "Lists", "Search", "Sort"] },
          { number: 4, title: "Computer Systems & Networks", weight: "11–15%", topics: ["Internet", "Protocols", "TCP/IP", "Cybersecurity", "Encryption"] },
          { number: 5, title: "Impact of Computing", weight: "21–26%", topics: ["Beneficial Effects", "Harmful Effects", "Digital Divide", "Crowdsourcing", "Legal & Ethical Concerns"] },
        ],
        quiz: [
          { q: "Which of the following best describes lossless compression?", options: ["Data is permanently removed to save space", "The original data can be perfectly reconstructed", "Image quality is reduced for storage", "Metadata is stripped from files"], answer: 1, explanation: "Lossless compression reduces file size without losing any data — the original can be fully restored." },
          { q: "In binary, the number 1010 equals what in decimal?", options: ["8", "10", "12", "14"], answer: 1, explanation: "1010₂ = 1×8 + 0×4 + 1×2 + 0×1 = 10₁₀." },
          { q: "What is the purpose of a protocol like HTTP?", options: ["To speed up internet connections", "To define rules for data transmission", "To store website data", "To prevent cyber attacks"], answer: 1, explanation: "Protocols are agreed-upon rules that define how data is formatted and transmitted between devices." },
          { q: "A program uses a list of 100 items. A linear search compares each item one-by-one. In the worst case, how many comparisons are needed?", options: ["1", "10", "50", "100"], answer: 3, explanation: "Linear search checks each element sequentially. Worst case: the item is last or not found — 100 comparisons." },
          { q: "Which of the following is an example of crowdsourcing?", options: ["A company hires programmers", "Wikipedia relies on public contributions", "A professor assigns homework", "An AI generates text"], answer: 1, explanation: "Crowdsourcing collects small contributions from a large group of people — like Wikipedia editors." },
        ],
        resources: [
          { label: "Code.org AP CSP", url: "https://code.org/educate/csp" },
          { label: "Khan Academy CSP", url: "https://www.khanacademy.org/computing/ap-computer-science-principles" },
        ],
      },
      {
        id: "ap-csa",
        name: "AP Computer Science A",
        banner: `${RESOURCES_BASE}/images/ap-precalc/precalcbanner.jpg`,
        units: [
          { number: 1, title: "Primitive Types", weight: "2.5–5%", topics: ["int, double, boolean", "Arithmetic", "Casting", "String basics"] },
          { number: 2, title: "Using Objects", weight: "5–7.5%", topics: ["Classes", "Constructors", "Methods", "String methods", "Math class"] },
          { number: 3, title: "Boolean Expressions & if Statements", weight: "15–17.5%", topics: ["Comparisons", "Logic operators", "Nested if-else", "Switch"] },
          { number: 4, title: "Iteration", weight: "17.5–22.5%", topics: ["while loops", "for loops", "for-each", "Nested loops"] },
          { number: 5, title: "Writing Classes", weight: "5–7.5%", topics: ["Instance variables", "Methods", "Constructors", "Encapsulation", "Static"] },
          { number: 6, title: "Array", weight: "10–15%", topics: ["Array creation", "Traversal", "Algorithms"] },
          { number: 7, title: "ArrayList", weight: "2.5–7.5%", topics: ["ArrayList methods", "Traversal", "Sorting"] },
          { number: 8, title: "2D Array", weight: "7.5–10%", topics: ["2D Array creation", "Row-major traversal", "Algorithms"] },
          { number: 9, title: "Inheritance", weight: "5–10%", topics: ["Superclass/Subclass", "Overriding", "Polymorphism"] },
          { number: 10, title: "Recursion", weight: "5–7.5%", topics: ["Base case", "Recursive calls", "Binary search"] },
        ],
        quiz: [
          { q: "What is the output of: int x = 7 / 2; System.out.println(x);", options: ["3", "3.5", "4", "Error"], answer: 0, explanation: "Integer division in Java truncates the decimal: 7/2 = 3 (not 3.5)." },
          { q: "Which keyword prevents a variable from being modified after initialization?", options: ["static", "final", "private", "protected"], answer: 1, explanation: "The 'final' keyword in Java makes a variable a constant — it cannot be reassigned." },
          { q: "An ArrayList<String> has 5 elements. What happens when you call list.remove(0)?", options: ["Removes the last element", "Removes the element at index 0", "Throws an error", "Returns null"], answer: 1, explanation: "list.remove(0) removes the element at index 0 and shifts all remaining elements left." },
          { q: "What is the base case in a recursive method?", options: ["The call that starts the recursion", "The condition that stops the recursion", "The most complex case", "The return type"], answer: 1, explanation: "The base case is the condition that stops recursive calls to prevent infinite recursion." },
          { q: "For a 2D array int[][] grid = new int[3][4], how many elements does it hold?", options: ["7", "10", "12", "16"], answer: 2, explanation: "3 rows × 4 columns = 12 elements total." },
        ],
        resources: [
          { label: "CodingBat Java Practice", url: "https://codingbat.com/java" },
        ],
      },
    ],
  },
  {
    id: "science",
    name: "Science",
    emoji: "🔬",
    gradient: "linear-gradient(135deg, #059669 0%, #0891B2 100%)",
    accentColor: "#059669",
    tagline: "Explore the natural world",
    courses: [
      {
        id: "ap-bio",
        name: "AP Biology",
        banner: `${RESOURCES_BASE}/images/ap-bio/biologybanner.jpg`,
        units: [
          { number: 1, title: "Chemistry of Life", weight: "8–11%", topics: ["Water & Hydrogen Bonding", "Elements of Life", "Biological Macromolecules", "Nucleic Acids"] },
          { number: 2, title: "Cell Structure & Function", weight: "10–13%", topics: ["Organelles", "Plasma Membranes", "Membrane Transport", "Osmosis", "Cell Cycle"] },
          { number: 3, title: "Cellular Energetics", weight: "12–16%", topics: ["Enzyme Structure", "Enzyme Catalysis", "Photosynthesis", "Cellular Respiration"] },
          { number: 4, title: "Cell Communication", weight: "10–15%", topics: ["Signal Transduction", "Feedback", "Cell Cycle Regulation"] },
          { number: 5, title: "Heredity", weight: "8–11%", topics: ["Meiosis", "Mendelian Genetics", "Non-Mendelian Genetics", "Chromosomal Inheritance"] },
          { number: 6, title: "Gene Expression", weight: "12–16%", topics: ["DNA Replication", "Transcription", "Translation", "Gene Regulation", "Mutations", "Biotechnology"] },
          { number: 7, title: "Natural Selection", weight: "13–20%", topics: ["Natural Selection", "Population Genetics", "Hardy-Weinberg", "Phylogeny", "Speciation"] },
          { number: 8, title: "Ecology", weight: "10–15%", topics: ["Energy Flow", "Population Ecology", "Community Ecology", "Biodiversity"] },
        ],
        quiz: [
          { q: "Which of the following correctly describes the function of ribosomes?", options: ["ATP production", "Protein synthesis", "Lipid breakdown", "DNA replication"], answer: 1, explanation: "Ribosomes are the sites of protein synthesis, translating mRNA codons into amino acid chains." },
          { q: "In photosynthesis, where do the light-dependent reactions occur?", options: ["Stroma", "Thylakoid membrane", "Mitochondrial matrix", "Cell membrane"], answer: 1, explanation: "Light-dependent reactions occur in the thylakoid membranes, using light to produce ATP and NADPH." },
          { q: "A cell with a higher solute concentration than its surroundings is described as:", options: ["Hypotonic", "Isotonic", "Hypertonic", "Turgid"], answer: 2, explanation: "A hypertonic solution has a higher solute concentration than the surrounding environment." },
          { q: "Which process produces the most ATP per glucose molecule?", options: ["Glycolysis", "Fermentation", "Oxidative phosphorylation", "The Krebs cycle"], answer: 2, explanation: "Oxidative phosphorylation (the electron transport chain) produces ~32-34 ATP per glucose — the most of any step." },
          { q: "According to Hardy-Weinberg equilibrium, which condition does NOT maintain equilibrium?", options: ["Large population size", "Natural selection", "Random mating", "No migration"], answer: 1, explanation: "Natural selection changes allele frequencies, violating Hardy-Weinberg equilibrium conditions." },
          { q: "Which molecule carries amino acids to the ribosome during translation?", options: ["mRNA", "rRNA", "tRNA", "snRNA"], answer: 2, explanation: "tRNA (transfer RNA) carries specific amino acids to the ribosome, matching codons via anticodons." },
        ],
        resources: [
          { label: "Unit 1 Notes", url: "https://docs.google.com/document/d/1mUpbDgoDUVSrrDNl9dAf3NTVoQUB99qeRYuFXYDNJoE/view" },
          { label: "Unit 2 Notes", url: "https://docs.google.com/document/d/1UUJjsCaFzyvBkgGMCgOeU_GUljPVor3SyJURGEMYqJs/view" },
          { label: "Biology Simulation", url: "https://bio-sim.us/" },
        ],
      },
      {
        id: "ap-chem",
        name: "AP Chemistry",
        banner: `${RESOURCES_BASE}/images/ap-chem/chemistrybanner.jpg`,
        units: [
          { number: 1, title: "Atomic Structure", weight: "7–9%", topics: ["Moles", "Mass Spectroscopy", "Electron Configuration", "Periodic Trends"] },
          { number: 2, title: "Molecular Structure", weight: "7–9%", topics: ["Lewis Diagrams", "Resonance", "Formal Charge", "VSEPR"] },
          { number: 3, title: "Intermolecular Forces", weight: "18–22%", topics: ["IMFs", "Gas Laws", "Solutions", "Beer-Lambert Law"] },
          { number: 4, title: "Chemical Reactions", weight: "7–9%", topics: ["Stoichiometry", "Titration", "REDOX", "Net-ionic Equations"] },
          { number: 5, title: "Kinetics", weight: "7–9%", topics: ["Rate Law", "Mechanisms", "Catalysis", "Collision Model"] },
          { number: 6, title: "Thermodynamics", weight: "7–9%", topics: ["Enthalpy", "Calorimetry", "Hess's Law", "Bond Enthalpies"] },
          { number: 7, title: "Equilibrium", weight: "7–9%", topics: ["Keq", "Le Châtelier's Principle", "Solubility Equilibria"] },
          { number: 8, title: "Acids & Bases", weight: "11–15%", topics: ["pH", "Buffers", "Henderson-Hasselbalch", "Titrations"] },
          { number: 9, title: "Applied Thermodynamics", weight: "7–9%", topics: ["Gibbs Free Energy", "Entropy", "Electrochemistry", "Faraday's Law"] },
        ],
        quiz: [
          { q: "What does a negative ΔG (Gibbs free energy) indicate about a reaction?", options: ["It is endothermic", "It is nonspontaneous", "It is spontaneous", "It requires a catalyst"], answer: 2, explanation: "A negative ΔG means the reaction is spontaneous (will proceed without external energy input)." },
          { q: "According to VSEPR theory, what is the molecular geometry of water (H₂O)?", options: ["Linear", "Trigonal planar", "Bent", "Tetrahedral"], answer: 2, explanation: "Water has 2 bonding pairs + 2 lone pairs on oxygen. VSEPR predicts a bent geometry (~104.5°)." },
          { q: "Which intermolecular force is responsible for water's unusually high boiling point?", options: ["London dispersion forces", "Dipole-dipole interactions", "Hydrogen bonding", "Ionic bonding"], answer: 2, explanation: "Hydrogen bonds in water (O-H···O) are strong intermolecular forces that require more energy to break, raising the boiling point." },
          { q: "In a buffer solution, what happens when a small amount of strong acid is added?", options: ["pH drops dramatically", "The conjugate base neutralizes the acid", "The pH becomes neutral", "The buffer stops working"], answer: 1, explanation: "The conjugate base in the buffer reacts with added H⁺, neutralizing it and maintaining a stable pH." },
          { q: "Le Châtelier's Principle states that if a system at equilibrium is disturbed, it will:", options: ["Reach a new equilibrium faster", "Shift to counteract the disturbance", "Increase the rate of the forward reaction", "Decrease the concentration of products"], answer: 1, explanation: "Le Châtelier's Principle: when disturbed, a system shifts direction to oppose the change and re-establish equilibrium." },
        ],
        resources: [
          { label: "Khan Academy Chemistry", url: "https://www.khanacademy.org/science/ap-chemistry-beta" },
          { label: "Fiveable AP Chem", url: "https://library.fiveable.me/ap-chem" },
        ],
      },
      {
        id: "ap-es",
        name: "AP Environmental Science",
        banner: `${RESOURCES_BASE}/images/ap-bio/biologybanner.jpg`,
        units: [
          { number: 1, title: "The Living World: Ecosystems", weight: "6–8%", topics: ["Ecosystem Services", "Carbon Cycle", "Nitrogen Cycle", "Hydrologic Cycle", "Food Chains"] },
          { number: 2, title: "The Living World: Biodiversity", weight: "6–8%", topics: ["Natural Disruptions", "Human Impacts", "Island Biogeography"] },
          { number: 3, title: "Populations", weight: "10–15%", topics: ["Carrying Capacity", "Reproductive Strategies", "Survivorship Curves", "Human Population"] },
          { number: 4, title: "Earth Systems & Resources", weight: "10–15%", topics: ["Plate Tectonics", "Soil Formation", "Soil Erosion", "Atmosphere Layers"] },
          { number: 5, title: "Land & Water Use", weight: "10–15%", topics: ["Agriculture", "Irrigation", "Forestry", "Mining", "Urbanization"] },
          { number: 6, title: "Energy Resources", weight: "10–15%", topics: ["Fossil Fuels", "Nuclear Power", "Renewable Energy", "Energy Conservation"] },
          { number: 7, title: "Atmospheric Pollution", weight: "7–10%", topics: ["Photochemical Smog", "Ozone Depletion", "Acid Deposition", "Indoor Air Pollution"] },
          { number: 8, title: "Aquatic & Terrestrial Pollution", weight: "7–10%", topics: ["Eutrophication", "Pesticides", "Biomagnification", "Solid Waste"] },
          { number: 9, title: "Global Change", weight: "15–20%", topics: ["Greenhouse Gases", "Climate Change", "Ocean Acidification", "Loss of Biodiversity"] },
        ],
        quiz: [
          { q: "Which greenhouse gas has the highest global warming potential (GWP) over 100 years?", options: ["CO₂", "Methane (CH₄)", "Nitrous oxide (N₂O)", "SF₆"], answer: 3, explanation: "SF₆ has an extremely high GWP (~23,500) though CO₂ is more abundant. N₂O (~298) and CH₄ (~25) are lower." },
          { q: "Eutrophication in a lake is most directly caused by:", options: ["Increased UV radiation", "Excess nutrients (N & P)", "Oil spills", "Acid deposition"], answer: 1, explanation: "Excess nitrogen and phosphorus (from fertilizers, sewage) fuel algal blooms → eutrophication." },
          { q: "Which energy source produces the LEAST CO₂ emissions per kWh?", options: ["Natural gas", "Coal", "Solar power", "Oil"], answer: 2, explanation: "Solar power produces near-zero direct CO₂ emissions during operation, the least of these options." },
          { q: "The demographic transition model predicts that as countries industrialize:", options: ["Birth rates rise and death rates fall", "Both birth and death rates decline", "Population growth accelerates indefinitely", "Death rates increase"], answer: 1, explanation: "In later stages of demographic transition, both birth and death rates decline as living standards improve." },
          { q: "Biomagnification means that toxins like DDT:", options: ["Break down faster in larger organisms", "Become more concentrated at higher trophic levels", "Are diluted through the food chain", "Only affect primary producers"], answer: 1, explanation: "Biomagnification: persistent toxins accumulate and concentrate as they move up the food chain." },
        ],
        resources: [
          { label: "Fiveable AP APES", url: "https://library.fiveable.me/ap-environmental-science" },
        ],
      },
      {
        id: "ap-physics-2",
        name: "AP Physics 2",
        banner: `${RESOURCES_BASE}/images/ap-chem/chemistrybanner.jpg`,
        units: [
          { number: 1, title: "Fluids", weight: "10–12%", topics: ["Pressure", "Buoyancy", "Archimedes' Principle", "Continuity", "Bernoulli's Equation"] },
          { number: 2, title: "Thermodynamics", weight: "12–18%", topics: ["Thermal Equilibrium", "Laws of Thermodynamics", "Heat Engines", "Entropy"] },
          { number: 3, title: "Electric Force & Field", weight: "18–22%", topics: ["Coulomb's Law", "Electric Fields", "Gauss's Law", "Conductors"] },
          { number: 4, title: "Electric Potential", weight: "10–16%", topics: ["Electric Potential Energy", "Voltage", "Capacitors"] },
          { number: 5, title: "Magnetism & EM Induction", weight: "10–16%", topics: ["Magnetic Fields", "Forces on Charges", "Faraday's Law", "Lenz's Law"] },
          { number: 6, title: "Geometric & Physical Optics", weight: "12–14%", topics: ["Reflection", "Refraction", "Lenses", "Double-Slit", "Diffraction"] },
          { number: 7, title: "Quantum & Nuclear Physics", weight: "10–12%", topics: ["Photons", "Photoelectric Effect", "Atomic Models", "Nuclear Decay", "Mass-Energy Equivalence"] },
        ],
        quiz: [
          { q: "According to Archimedes' Principle, an object floats when:", options: ["Its density equals the fluid's density", "The buoyant force equals its weight", "Its volume is less than the fluid's volume", "It is less massive than the fluid"], answer: 1, explanation: "An object floats when the upward buoyant force equals the downward gravitational force (weight)." },
          { q: "Two charged spheres repel each other. This means they have:", options: ["Opposite charges", "The same type of charge", "No charge", "Different masses"], answer: 1, explanation: "Like charges repel. If the spheres repel, they must both be positive or both be negative." },
          { q: "Which best describes the photoelectric effect?", options: ["Light bends around corners", "Electrons are emitted from metal when light shines on it", "Light splits into colors through a prism", "Electrons orbit the nucleus in shells"], answer: 1, explanation: "The photoelectric effect: photons of sufficient frequency eject electrons from a metal surface." },
          { q: "According to the Second Law of Thermodynamics, in an isolated system, entropy:", options: ["Always decreases", "Always increases or stays the same", "Stays constant", "Decreases then increases"], answer: 1, explanation: "The Second Law states that entropy in an isolated system always increases or, at best, stays the same." },
          { q: "A ray of light moving from glass (n=1.5) to air (n=1.0) will:", options: ["Bend toward the normal", "Bend away from the normal", "Not change direction", "Be completely reflected always"], answer: 1, explanation: "Moving from a denser (higher n) to less dense medium, light bends away from the normal (Snell's law)." },
        ],
        resources: [
          { label: "Khan Academy Physics 2", url: "https://www.khanacademy.org/science/ap-physics-2" },
        ],
      },
    ],
  },
  {
    id: "english",
    name: "English",
    emoji: "📚",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)",
    accentColor: "#7C3AED",
    tagline: "Read, analyze, and argue",
    courses: [
      {
        id: "ap-lang",
        name: "AP English Language",
        banner: `${RESOURCES_BASE}/images/ap-world-history/worldbanner.jpg`,
        units: [
          { number: 1, title: "Foundations of Rhetoric", weight: "~15%", topics: ["Claims", "Evidence", "Reasoning", "Rhetorical Situation", "Audience"] },
          { number: 2, title: "Rhetorical Analysis", weight: "~25%", topics: ["Speaker & Purpose", "SOAPS", "Appeals: Ethos, Pathos, Logos", "Stylistic Choices"] },
          { number: 3, title: "Argument", weight: "~25%", topics: ["Claim Types", "Evidence Selection", "Reasoning Strategies", "Counterarguments", "Qualifying Claims"] },
          { number: 4, title: "Style & Tone", weight: "~20%", topics: ["Diction", "Syntax", "Figurative Language", "Tone Shifts"] },
          { number: 5, title: "Synthesis & Research", weight: "~15%", topics: ["Incorporating Sources", "Attributing Evidence", "Avoiding Plagiarism", "MLA Format"] },
        ],
        quiz: [
          { q: "Ethos as a rhetorical appeal refers to:", options: ["Appealing to emotion", "Appealing to credibility/character", "Appealing to logic and evidence", "Appealing to the audience's values"], answer: 1, explanation: "Ethos establishes the speaker's credibility and trustworthiness to persuade the audience." },
          { q: "A writer who acknowledges opposing viewpoints before refuting them is using:", options: ["A straw man argument", "Concession and rebuttal", "Post hoc reasoning", "Ad hominem"], answer: 1, explanation: "Concession and rebuttal is a sophisticated strategy: acknowledge the opposition, then explain why your argument is still stronger." },
          { q: "Which of the following is an example of an anaphora?", options: ['"I have a dream... I have a dream..."', '"Life is a box of chocolates"', '"The wind whispered through the trees"', '"It was the best of times, it was the worst of times"'], answer: 0, explanation: "Anaphora is the repetition of a word or phrase at the beginning of successive clauses — 'I have a dream...' repeated." },
          { q: "In the rhetorical situation, 'exigence' refers to:", options: ["The writer's purpose", "The imperfection or urgency that prompts communication", "The audience's needs", "The medium of delivery"], answer: 1, explanation: "Exigence is the issue, problem, or situation that motivates a rhetor to communicate." },
          { q: "Which type of claim argues that a policy should be adopted?", options: ["Claim of fact", "Claim of value", "Claim of policy", "Claim of definition"], answer: 2, explanation: "Claims of policy argue what should be done — they propose actions or solutions." },
        ],
        resources: [
          { label: "Purdue OWL", url: "https://owl.purdue.edu/owl/subject_specific_writing/ap_english_language_and_composition/" },
          { label: "Fiveable AP Lang", url: "https://library.fiveable.me/ap-lang" },
        ],
      },
      {
        id: "ap-lit",
        name: "AP English Literature",
        banner: `${RESOURCES_BASE}/images/ap-world-history/worldbanner.jpg`,
        units: [
          { number: 1, title: "Short Fiction", weight: "~20%", topics: ["Character", "Setting", "Plot", "Conflict", "Narrative Perspective"] },
          { number: 2, title: "Poetry", weight: "~20%", topics: ["Structure", "Speaker", "Figurative Language", "Sound Devices", "Imagery"] },
          { number: 3, title: "Longer Fiction & Drama", weight: "~60%", topics: ["Theme Development", "Symbolism", "Characterization", "Ambiguity", "Open Essay"] },
        ],
        quiz: [
          { q: "When a narrator is 'unreliable,' it means:", options: ["They make factual errors in dates", "Their account may be biased or incomplete", "They speak in a foreign language", "They are not the main character"], answer: 1, explanation: "An unreliable narrator cannot be fully trusted — their account is colored by bias, limited knowledge, or dishonesty." },
          { q: "Which literary device is used when a story begins in the middle of the action?", options: ["Flashback", "In medias res", "Foreshadowing", "Deus ex machina"], answer: 1, explanation: "In medias res (Latin: 'in the middle of things') — a narrative technique where the story starts in the middle of the action." },
          { q: "A tragic hero according to Aristotle must have:", options: ["An evil nature", "A fatal flaw (hamartia)", "A happy ending", "A supernatural enemy"], answer: 1, explanation: "Hamartia is the 'fatal flaw' of Aristotle's tragic hero — a character weakness that leads to their downfall." },
          { q: "The repetition of consonant sounds at the beginning of words is called:", options: ["Assonance", "Consonance", "Alliteration", "Onomatopoeia"], answer: 2, explanation: "Alliteration is the repetition of the same consonant sound at the beginning of multiple words (e.g., 'Peter Piper picked')." },
        ],
        resources: [
          { label: "Sparknotes Literature", url: "https://www.sparknotes.com/" },
          { label: "Fiveable AP Lit", url: "https://library.fiveable.me/ap-lit" },
        ],
      },
      {
        id: "ap-seminar",
        name: "AP Seminar",
        banner: `${RESOURCES_BASE}/images/ap-world-history/worldbanner.jpg`,
        units: [
          { number: 1, title: "Reading Critically", weight: "~25%", topics: ["Identifying Claims", "Evaluating Evidence", "Assessing Perspectives", "Cross-textual Connections"] },
          { number: 2, title: "Research Methods", weight: "~25%", topics: ["Research Questions", "Source Selection", "Credibility Assessment", "Avoiding Bias"] },
          { number: 3, title: "Team Collaboration", weight: "~25%", topics: ["Group Dynamic", "Roles", "Productive Disagreement", "Consensus Building"] },
          { number: 4, title: "Presentation & Argument", weight: "~25%", topics: ["Oral Presentation", "Visual Aids", "Q&A Preparation", "Structured Argument"] },
        ],
        quiz: [
          { q: "In AP Seminar, the Individual Research Report (IRR) is scored on:", options: ["Length only", "Argument, evidence, and presentation quality", "Grammar and spelling", "Number of sources cited"], answer: 1, explanation: "The IRR is evaluated on the quality of research, argumentation, use of evidence, and presentation." },
          { q: "A 'perspective' in AP Seminar refers to:", options: ["A type of camera angle", "A lens or viewpoint through which an issue is examined", "A personal opinion only", "A historical time period"], answer: 1, explanation: "Perspectives (economic, political, cultural, etc.) are lenses that frame how we understand a complex issue." },
          { q: "When evaluating source credibility, which factor is MOST important?", options: ["The length of the source", "The author's expertise and publication context", "The number of images in the source", "The date of publication alone"], answer: 1, explanation: "The author's credentials, methodology, and where it was published are key credibility factors." },
        ],
        resources: [
          { label: "AP Seminar Course Page", url: "https://apstudents.collegeboard.org/courses/ap-seminar" },
        ],
      },
    ],
  },
  {
    id: "history",
    name: "History & Social Studies",
    emoji: "🌍",
    gradient: "linear-gradient(135deg, #B45309 0%, #DC2626 100%)",
    accentColor: "#B45309",
    tagline: "Understand the world we built",
    courses: [
      {
        id: "ap-world",
        name: "AP World History",
        banner: `${RESOURCES_BASE}/images/ap-world-history/worldbanner.jpg`,
        units: [
          { number: 1, title: "The Global Tapestry (1200–1450)", weight: "8–10%", topics: ["East Asia", "Dar al-Islam", "South & Southeast Asia", "Americas", "Africa", "Europe"] },
          { number: 2, title: "Networks of Exchange (1200–1450)", weight: "8–10%", topics: ["Silk Roads", "Mongol Empire", "Indian Ocean", "Trans-Saharan Trade", "Columbian Exchange precursors"] },
          { number: 3, title: "Land-Based Empires (1450–1750)", weight: "12–15%", topics: ["Ottoman Empire", "Mughal Empire", "Safavid Empire", "Qing Dynasty", "Religious Diversity"] },
          { number: 4, title: "Transoceanic Interconnections (1450–1750)", weight: "12–15%", topics: ["Columbian Exchange", "Maritime Empires", "Slave Trade", "Social Hierarchies"] },
          { number: 5, title: "Revolutions (1750–1900)", weight: "12–15%", topics: ["Enlightenment", "Industrial Revolution", "American Revolution", "French Revolution", "Nationalism"] },
          { number: 6, title: "Consequences of Industrialization (1750–1900)", weight: "12–15%", topics: ["Imperialism", "State Expansion", "Indigenous Responses", "Migration"] },
          { number: 7, title: "Global Conflict (1900–Present)", weight: "8–10%", topics: ["WWI", "WWII", "Mass Atrocities", "Interwar Economy"] },
          { number: 8, title: "Cold War & Decolonization (1900–Present)", weight: "8–10%", topics: ["Cold War", "Communism", "Decolonization", "Global Resistance"] },
          { number: 9, title: "Globalization (1900–Present)", weight: "8–10%", topics: ["Technology", "Economics", "Cultural Exchange", "Environmental Change"] },
        ],
        quiz: [
          { q: "The Silk Roads primarily facilitated the exchange of:", options: ["Only silk textiles", "Trade goods, people, and ideas across Eurasia", "Military alliances", "Agricultural techniques only"], answer: 1, explanation: "The Silk Roads connected Eurasia, enabling the movement of goods, peoples, religions (Buddhism, Islam), and diseases." },
          { q: "The Columbian Exchange MOST significantly contributed to:", options: ["The decline of European monarchies", "Population growth in Europe due to new food crops", "The end of the Atlantic slave trade", "The rise of democracy in the Americas"], answer: 1, explanation: "New World crops (potatoes, maize, tomatoes) introduced to Europe led to population booms in the 18th century." },
          { q: "Which of the following BEST describes the system of mercantilism?", options: ["Free trade between nations", "Colonies exist to enrich the mother country", "Equal trade partnerships", "Government non-interference in the economy"], answer: 1, explanation: "Mercantilism: the idea that colonies exist to supply raw materials and buy manufactured goods, enriching the imperial power." },
          { q: "The Berlin Conference (1884–85) is associated with:", options: ["Ending WWI", "European powers dividing Africa into colonies", "The formation of the League of Nations", "Abolishing the slave trade"], answer: 1, explanation: "The Berlin Conference allowed European powers to divide Africa among themselves with little regard for existing ethnic/cultural boundaries." },
          { q: "The Green Revolution of the 20th century primarily resulted in:", options: ["Widespread deforestation", "Increased agricultural productivity in developing nations", "The spread of Communism", "Urbanization in Western Europe"], answer: 1, explanation: "The Green Revolution introduced high-yield crop varieties, irrigation, and fertilizers, significantly boosting food production." },
          { q: "Which concept BEST explains why the Mongol Empire was so effective at conquering vast territories?", options: ["Superior naval technology", "Military discipline, mobility, and psychological warfare", "Peaceful diplomacy", "Religious unification"], answer: 1, explanation: "The Mongols used highly mobile cavalry, psychological terror (surrender or be destroyed), and adaptive military tactics." },
        ],
        resources: [
          { label: "Unit 1 Notes", url: "https://docs.google.com/document/d/1pTViRYIKPXuCIJPIgHdnZuyIY3-SN9xLFwcbpcsz0wg/view" },
          { label: "Heimler's History", url: "https://www.youtube.com/@heimlershistory" },
          { label: "Fiveable AP World", url: "https://library.fiveable.me/ap-world-history" },
        ],
      },
      {
        id: "apush",
        name: "AP US History",
        banner: `${RESOURCES_BASE}/images/apush/apushbanner.jpg`,
        units: [
          { number: 1, title: "Period 1: 1491–1607", weight: "4–6%", topics: ["Native Societies", "European Exploration", "Columbian Exchange", "Spanish Colonization"] },
          { number: 2, title: "Period 2: 1607–1754", weight: "6–8%", topics: ["British Colonization", "Regional Colonies", "Transatlantic Trade", "Slavery", "Colonial Culture"] },
          { number: 3, title: "Period 3: 1754–1800", weight: "10–17%", topics: ["French & Indian War", "Revolution", "Constitution", "Early Republic"] },
          { number: 4, title: "Period 4: 1800–1848", weight: "10–17%", topics: ["Jeffersonian Politics", "Market Revolution", "Reform Movements", "Manifest Destiny"] },
          { number: 5, title: "Period 5: 1844–1877", weight: "10–17%", topics: ["Manifest Destiny", "Slavery & Sectionalism", "Civil War", "Reconstruction"] },
          { number: 6, title: "Period 6: 1865–1898", weight: "10–17%", topics: ["Gilded Age", "Immigration", "Labor Movement", "Industrialization"] },
          { number: 7, title: "Period 7: 1890–1945", weight: "10–17%", topics: ["Imperialism", "WWI", "Progressivism", "Great Depression", "New Deal", "WWII"] },
          { number: 8, title: "Period 8: 1945–1980", weight: "10–17%", topics: ["Cold War", "Civil Rights Movement", "Vietnam War", "Great Society", "Social Movements"] },
          { number: 9, title: "Period 9: 1980–Present", weight: "4–6%", topics: ["Reaganomics", "Cold War End", "Globalization", "21st Century"] },
        ],
        quiz: [
          { q: "The Three-Fifths Compromise at the Constitutional Convention determined that:", options: ["All enslaved people could vote in elections", "Enslaved people counted as 3/5 of a person for representation", "Three-fifths of states must ratify amendments", "Taxes would be set at three-fifths of income"], answer: 1, explanation: "The Three-Fifths Compromise counted enslaved people as 3/5 of a person for congressional representation, boosting Southern political power." },
          { q: "Which of the following BEST describes the concept of Manifest Destiny?", options: ["The U.S. must remain isolated from world affairs", "American expansion to the Pacific was divinely ordained", "Democracy must be spread by force", "Native American rights must be protected"], answer: 1, explanation: "Manifest Destiny was the 19th-century belief that American westward expansion across the continent was inevitable and divinely justified." },
          { q: "The New Deal primarily aimed to address the Great Depression by:", options: ["Reducing government spending", "Providing relief, recovery, and reform programs", "Declaring war on Germany", "Passing free trade agreements"], answer: 1, explanation: "FDR's New Deal created federal programs for relief (jobs, aid), recovery (economic stimulation), and reform (banking regulation)." },
          { q: "The Truman Doctrine (1947) committed the U.S. to:", options: ["Military alliances in Western Europe", "Containing the spread of communism globally", "Direct war with the Soviet Union", "Economic aid to Japan"], answer: 1, explanation: "The Truman Doctrine stated the U.S. would support free peoples resisting communist subjugation — a cornerstone of Cold War containment policy." },
          { q: "Which Supreme Court case ruled that racial segregation in public schools was unconstitutional?", options: ["Plessy v. Ferguson", "Brown v. Board of Education", "Marbury v. Madison", "McCulloch v. Maryland"], answer: 1, explanation: "Brown v. Board of Education (1954) overturned Plessy v. Ferguson, ruling that 'separate but equal' in public education was unconstitutional." },
          { q: "The Civil Rights Act of 1964 primarily:", options: ["Gave African Americans the right to vote", "Banned discrimination based on race, color, religion, sex, or national origin", "Desegregated the military", "Established affirmative action programs"], answer: 1, explanation: "The Civil Rights Act of 1964 outlawed discrimination in employment and public accommodations based on race, color, religion, sex, or national origin." },
        ],
        resources: [
          { label: "Unit 1–5 Notes", url: "https://resources.apstudy.org/apush" },
          { label: "Heimler's History", url: "https://www.youtube.com/@heimlershistory" },
          { label: "Fiveable APUSH", url: "https://library.fiveable.me/apush" },
        ],
      },
      {
        id: "ap-hug",
        name: "AP Human Geography",
        banner: `${RESOURCES_BASE}/images/apush/apushbanner.jpg`,
        units: [
          { number: 1, title: "Thinking Geographically", weight: "8–10%", topics: ["Maps & Projections", "Scale", "Spatial Patterns", "Geographic Concepts"] },
          { number: 2, title: "Population & Migration", weight: "12–17%", topics: ["Population Growth", "Demographic Transition", "Push/Pull Factors", "Migration Patterns"] },
          { number: 3, title: "Cultural Patterns & Processes", weight: "12–17%", topics: ["Cultural Diffusion", "Language", "Religion", "Ethnicity", "Globalization"] },
          { number: 4, title: "Political Organization of Space", weight: "12–17%", topics: ["State Systems", "Boundaries", "Centrifugal & Centripetal Forces", "Geopolitics"] },
          { number: 5, title: "Agriculture & Rural Land Use", weight: "12–17%", topics: ["Agricultural Revolutions", "Von Thünen Model", "Agricultural Regions", "Land Use Patterns"] },
          { number: 6, title: "Cities & Urban Land Use", weight: "12–17%", topics: ["Urbanization", "City Models", "Urban Issues", "Suburbanization", "Gentrification"] },
          { number: 7, title: "Industrial & Economic Development", weight: "12–17%", topics: ["Industrial Revolution", "Development Indicators", "HDI", "Dependency Theory", "Globalization"] },
        ],
        quiz: [
          { q: "The demographic transition model predicts that in Stage 2, which of the following occurs?", options: ["Both birth and death rates are high", "Death rates fall while birth rates remain high, causing population growth", "Both birth and death rates fall", "Population growth stops"], answer: 1, explanation: "Stage 2: improved medicine lowers death rates, but birth rates stay high — causing rapid population growth." },
          { q: "Which urban land use model divides the city into sectors radiating outward from the CBD?", options: ["Concentric Zone Model", "Sector Model", "Multiple Nuclei Model", "Urban Realms Model"], answer: 1, explanation: "The Sector Model (Hoyt, 1939) shows land use patterns as wedge-shaped sectors radiating from the CBD along transportation routes." },
          { q: "Centrifugal forces in a state are those that:", options: ["Unite and strengthen national identity", "Divide or destabilize the state", "Attract immigrants", "Promote economic growth"], answer: 1, explanation: "Centrifugal forces pull a state apart — ethnic conflict, language barriers, regional disparities are examples." },
          { q: "The Green Revolution's primary impact on developing countries was:", options: ["Increased urbanization", "Higher agricultural yields through new crop varieties and technology", "Widespread deforestation", "Reduced water usage"], answer: 1, explanation: "The Green Revolution introduced high-yield crop varieties, fertilizers, and irrigation, dramatically increasing food production." },
          { q: "Which of the following BEST describes a primate city?", options: ["A city known for wildlife tourism", "The dominant city disproportionately larger than all others in the country", "A city with the oldest history in a nation", "The capital city of a nation"], answer: 1, explanation: "A primate city is overwhelmingly dominant — typically 2x+ the size of the second-largest city (e.g., Paris, Bangkok, Mexico City)." },
        ],
        resources: [
          { label: "Fiveable AP HuG", url: "https://library.fiveable.me/ap-human-geography" },
        ],
      },
    ],
  },
];

export function findCourseById(id: string): { subject: Subject; course: Course } | null {
  for (const subject of SUBJECTS) {
    const course = subject.courses.find((c) => c.id === id);
    if (course) return { subject, course };
  }
  return null;
}

export function findSubjectById(id: string): Subject | null {
  return SUBJECTS.find((s) => s.id === id) ?? null;
}
