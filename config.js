const PAUL_DATA = {
    firstName: "Paul",
    middleName: "Adriano",
    surname: "Carandang",
    fullName: "Paul Adriano Carandang",
    dob: "November 6, 1987",
    education: {
        college: "Associate Degree in Computer Science, Manila Montessori College International (Graduated 2008)",
        highSchool: "San Roque High School Paombong, Bulacan (Graduated 2006)",
        elementary: "Canalate Elementary School (Graduated 2001)"
    },
    roles: [
        "Non-Voice Customer Support",
        "AI Video Creator",
        "Programmer"
    ],
    experience: "Intern Secretary at Office of the City Prosecutor. Handled confidential documents and office operations.",
    skills: {
        support: ["Email & Chat Support", "Problem Solving", "Professional Writing", "Fast Typing"],
        creative: ["AI Content Generation", "AI Video Creation", "Video Editing", "Explainer Videos"],
        tech: ["HTML", "Scripting", "GitHub", "Data Encoding", "Office Desk Jobs"]
    },
    capabilities: [
        "Fast and accurate non-voice customer support",
        "Professional email and chat handling",
        "Efficient AI-powered content creation",
        "Building simple automation tools"
    ],
    hobby: "Playing Chess",
    healthStatus: "Right Hemiplegia: A condition resulting from damage to the brain or spinal cord, causing weakness or paralysis on the right side of the body.",
    offers: [
        "Reliable non-voice support",
        "AI-powered video creation",
        "Strong attention to detail"
    ]
};

// For browser use
if (typeof window !== 'undefined') {
    window.PAUL_DATA = PAUL_DATA;
}
// For Node.js use
if (typeof module !== 'undefined') {
    module.exports = PAUL_DATA;
}
