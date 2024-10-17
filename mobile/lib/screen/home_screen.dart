import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  // Compulsory plantation tasks with completion status
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
        title: const Text("Plantation Activities"),
        backgroundColor: Colors.green[700],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "Today's Tasks",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),

            // Compulsory Tasks Section
            const Text(
              "Compulsory Tasks",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
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
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
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
                            : Colors.grey, // Disable look if compulsory not completed
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
            ),
          ],
        ),
      ),
    );
  }
}
