// Function to load students
function loadStudents() {
    // Sample code to fetch students from a server
    fetch('/api/students')
        .then(response => response.json())
        .then(data => {
            console.log('Students:', data);
            // Display students in the UI
        })
        .catch(error => console.error('Error loading students:', error));
}

// Function to add a student
function addStudent(student) {
    fetch('/api/students', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(student)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Added student:', data);
        loadStudents(); // Reload students after adding
    })
    .catch(error => console.error('Error adding student:', error));
}

// Function to update a student
function updateStudent(studentId, updatedInfo) {
    fetch(`/api/students/${studentId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedInfo)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Updated student:', data);
        loadStudents(); // Reload students after updating
    })
    .catch(error => console.error('Error updating student:', error));
}

// Function to delete a student
function deleteStudent(studentId) {
    fetch(`/api/students/${studentId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('Deleted student with ID:', studentId);
            loadStudents(); // Reload students after deleting
        }
    })
    .catch(error => console.error('Error deleting student:', error));
}