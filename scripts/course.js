const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true 
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to web development...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students become more efficient programmers...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces encapsulation...',
        technology: ['C#'],
        completed: true // 
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students will learn JavaScript interactivity...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    },
    {
    subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
        }
];


function displayCourses(filter = "ALL") {
    const courseContainer = document.getElementById("course-list");
    courseContainer.innerHTML = "";

    
    let filteredCourses = courses;
    if (filter !== "ALL") {
        filteredCourses = courses.filter(course => course.subject === filter);
    }

    
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);

    filteredCourses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <h3>${course.title} (${course.subject} ${course.number})</h3>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p>${course.description}</p>
            <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
        `;

        courseContainer.appendChild(courseCard);
    });

    document.getElementById("total-credits").textContent = `Total Credits: ${totalCredits}`;
}

document.getElementById("all-btn").addEventListener("click", () => displayCourses("ALL"));
document.getElementById("wdd-btn").addEventListener("click", () => displayCourses("WDD"));
document.getElementById("cse-btn").addEventListener("click", () => displayCourses("CSE"));

displayCourses();