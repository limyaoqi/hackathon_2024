import 'package:flutter/material.dart';
import 'package:mobile/screens/group.dart';
import 'package:mobile/screens/history.dart';


class HomePage extends StatefulWidget {
  HomePage(
      {super.key,
      required this.taskInProgress,
      required this.setTask,
      required this.compulsoryTasks,
      required this.additionalTasks});
  bool taskInProgress;
  final Function setTask;
  List<Map<String, dynamic>> compulsoryTasks;
  List<Map<String, dynamic>> additionalTasks;
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final List<Map<String, dynamic>> compulsoryTasks = [
    {"task": "Water the plants", "isCompleted": false},
    {"task": "Check soil moisture", "isCompleted": false},
    {"task": "Add fertilizer", "isCompleted": false},
  ];

  // Additional plantation tasks with completion status
  final List<Map<String, dynamic>> additionalTasks = [
    {"task": "Prune the plants", "isCompleted": false},
    {"task": "Check for pests", "isCompleted": false},
    {"task": "Clean the garden area", "isCompleted": false},
  ];

  // Method to toggle task completion
  void _toggleTaskCompletion(List<Map<String, dynamic>> tasks, int index) {
    setState(() {
      tasks[index]['isCompleted'] = !tasks[index]['isCompleted'];
    });
  }

  // Check if all compulsory tasks are completed
  bool _areAllCompulsoryTasksCompleted() {
    return compulsoryTasks.every((task) => task['isCompleted']);
  }

  
  @override
  Widget build(BuildContext context) {
    // Check if all compulsory tasks are completed
    bool allCompulsoryTasksCompleted = _areAllCompulsoryTasksCompleted();

  return Scaffold(
    appBar: AppBar(
      title: const Text(
        "Plantation Activities",
        style: TextStyle(
          fontSize: 24, // Increased font size for the app bar title
          fontWeight: FontWeight.w600,
          letterSpacing: 1.2, // Adding slight spacing for elegance
        ),
      ),
      backgroundColor: Colors.green[800],
    ),
    body: Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Today's Eco-friendly Chores",
            style: TextStyle(
              fontSize: 28, // Larger title for emphasis
              fontWeight: FontWeight.bold, // Bold for title
              color: Colors.green, // Color to match the eco theme
            ),
          ),
          const SizedBox(height: 16),

          // Compulsory Tasks Section
          const Text(
            "Compulsory Tasks",
            style: TextStyle(
              fontSize: 24, // Slightly smaller than main title
              fontWeight: FontWeight.w600, // Medium weight for section headers
              color: Colors.black87,
            ),
            Expanded(
              child: ListView.builder(
                itemCount: compulsoryTasks.length,
                itemBuilder: (context, index) {
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    child: ListTile(
                      leading: Icon(
                        Icons.nature,
                        color: Colors.green[600],
                      ),
                      title: Text(compulsoryTasks[index]['task']),
                      trailing: Checkbox(
                        value: compulsoryTasks[index]['isCompleted'],
                        onChanged: (bool? value) {
                          _toggleTaskCompletion(compulsoryTasks, index);
                        },
                      ),
                    ),
                  );
                },
              ),
            ),

          const SizedBox(height: 16),

          // Additional Tasks Section
          const Text(
            "Additional Tasks",
            style: TextStyle(
              fontSize: 24, // Same size as Compulsory Tasks title
              fontWeight: FontWeight.w600,
              color: Colors.black87,
            ),
            Expanded(
              child: ListView.builder(
                itemCount: additionalTasks.length,
                itemBuilder: (context, index) {
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    child: ListTile(
                      leading: Icon(
                        Icons.nature_people,
                        color: allCompulsoryTasksCompleted
                            ? Colors.green[600]
                            : Colors
                                .grey, // Disable look if compulsory not completed
                      ),
                      title: Text(
                        additionalTasks[index]['task'],
                        style: TextStyle(
                          color: allCompulsoryTasksCompleted
                              ? Colors.black
                              : Colors.grey, // Text is greyed out if disabled
                        ),
                      ),
                      trailing: Checkbox(
                        value: additionalTasks[index]['isCompleted'],
                        onChanged: allCompulsoryTasksCompleted
                            ? (bool? value) {
                                _toggleTaskCompletion(additionalTasks, index);
                              }
                            : null, // Disable checkbox if compulsory not completed
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        ],
      ),
    ),
  );
}

}
