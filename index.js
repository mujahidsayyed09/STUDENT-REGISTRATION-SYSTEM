document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("studentForm");
    const submitBtn = document.getElementById("submitBtn");
    let editingStudentId = localStorage.getItem("editStudentId"); // Get editing ID

    if (form) {
        //Prefill form if editing
        if (editingStudentId) {
            let students = JSON.parse(localStorage.getItem("students")) || [];
            let student = students.find(s => s.id == editingStudentId);

            if (student) {
                document.getElementById("name").value = student.name;
                document.getElementById("studentId").value = student.StudentID;
                document.getElementById("classs").value = student.classs;
                document.getElementById("email").value = student.email;
                document.getElementById("contact").value = student.contact;

                submitBtn.value = "UPDATE"; // Change button text
            }
        }

        // Handle form submission
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let students = JSON.parse(localStorage.getItem("students")) || [];

            const student = {
                id: editingStudentId ? editingStudentId : Date.now().toString(),
                name: document.getElementById("name").value.trim(),
                StudentID: document.getElementById("studentId").value.trim(),
                classs: document.getElementById("classs").value.trim(),
                email: document.getElementById("email").value.trim(),
                contact: document.getElementById("contact").value.trim(),
            };

            if (editingStudentId) {
                students = students.map(s => (s.id == editingStudentId ? student : s));
                localStorage.removeItem("editStudentId"); // Clear after update
                alert("Student updated!");
            } else {
                students.push(student);
                alert("Student registered!");
            }

            localStorage.setItem("students", JSON.stringify(students));
            form.reset();
            submitBtn.value = "SUBMIT"; // Reset button text
        });
    }

    loadStudents(); // Load students if on students.html
});

// Load students into the table
function loadStudents() {
    const studentList = document.getElementById("studentList");
    if (!studentList) return;

    let students = JSON.parse(localStorage.getItem("students")) || [];
    studentList.innerHTML = "";

    students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="py-2 px-4 border">${student.name}</td>
            <td class="py-2 px-4 border">${student.StudentID}</td>
            <td class="py-2 px-4 border">${student.classs}</td>
            <td class="py-2 px-4 border">${student.email}</td>
            <td class="py-2 px-4 border">${student.contact}</td>
            <td class="py-2 px-4 border">
                <button onclick="editStudent('${student.id}')" class="bg-gray-950 text-white px-3 py-1 rounded">Edit</button>
                <button onclick="deleteStudent('${student.id}')" class="bg-red-800 text-white px-3 py-1 rounded">Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}

// Edit student
function editStudent(id) {
    localStorage.setItem("editStudentId", id);
    window.location.href = "index.html"; // Redirect to form
}

// Delete student
function deleteStudent(id) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter(s => s.id !== id);

    localStorage.setItem("students", JSON.stringify(students));
    loadStudents(); // Refresh table
}
