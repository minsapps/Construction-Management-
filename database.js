// Firestore shortcuts
const usersRef = window.db.collection("users");
const projectsRef = window.db.collection("projects");

// Create a new project
async function createProject(projectName, customerId) {
  const doc = await projectsRef.add({
    projectName,
    customerId,
    startDate: new Date().toISOString(),
    status: "in-progress",
    totalPayments: 0
  });

  return doc.id;
}

// Create a phase inside a project
async function createPhase(projectId, phaseName, assignedTo, dueDate) {
  const phaseRef = projectsRef.doc(projectId).collection("phases");

  await phaseRef.add({
    phaseName,
    assignedTo,
    dueDate,
    status: "not-started",
    progress: 0
  });
}

// Create a task inside a phase
async function createTask(projectId, phaseId, taskName, assignedTo, dueDate) {
  const taskRef = projectsRef
    .doc(projectId)
    .collection("phases")
    .doc(phaseId)
    .collection("tasks");

  await taskRef.add({
    taskName,
    assignedTo,
    dueDate,
    status: "not-started",
    dailyPhotos: [],
    notes: ""
  });
}
