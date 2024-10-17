import 'package:flutter/material.dart';
import 'package:mobile/screens/group.dart';
import 'package:mobile/screens/history.dart';


class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final List<Map<String, dynamic>> compulsoryTasks = [
    {"task": "Water the plants", "isCompleted": false},
    {"task": "Check soil moisture", "isCompleted": false},
    {"task": "Add fertilizer", "isCompleted": false},
  ];

  final List<Map<String, dynamic>> additionalTasks = [
    {"task": "Prune the plants", "isCompleted": false},
    {"task": "Check for pests", "isCompleted": false},
    {"task": "Clean the garden area", "isCompleted": false},
  ];

  void _toggleTaskCompletion(List<Map<String, dynamic>> tasks, int index) {
    setState(() {
      tasks[index]['isCompleted'] = !tasks[index]['isCompleted'];
    });
  }

  bool _areAllCompulsoryTasksCompleted() {
    return compulsoryTasks.every((task) => task['isCompleted']);
  }

  
  @override
Widget build(BuildContext context) {
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
          ),
          const SizedBox(height: 8),
          Expanded(
            child: ListView.builder(
              itemCount: compulsoryTasks.length,
              itemBuilder: (context, index) {
                return Card(
                  margin: const EdgeInsets.symmetric(vertical: 8.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                  elevation: 6,
                  color: compulsoryTasks[index]['isCompleted']
                      ? Colors.green[50]
                      : Colors.white,
                  child: ListTile(
                    leading: Icon(
                      Icons.check_circle,
                      color: compulsoryTasks[index]['isCompleted']
                          ? Colors.green
                          : Colors.grey,
                      size: 28,
                    ),
                    title: Text(
                      compulsoryTasks[index]['task'],
                      style: TextStyle(
                        fontSize: 18, // Task titles should be clear but not too large
                        fontWeight: FontWeight.w500, // Medium weight for readability
                        color: compulsoryTasks[index]['isCompleted']
                            ? Colors.green[700]
                            : Colors.black87,
                      ),
                    ),
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
          ),
          const SizedBox(height: 8),
          Expanded(
            child: ListView.builder(
              itemCount: additionalTasks.length,
              itemBuilder: (context, index) {
                return Card(
                  margin: const EdgeInsets.symmetric(vertical: 8.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                  elevation: 6,
                  color: allCompulsoryTasksCompleted
                      ? Colors.green[50]
                      : Colors.white,
                  child: ListTile(
                    leading: Icon(
                      Icons.nature,
                      color: allCompulsoryTasksCompleted
                          ? Colors.green[600]
                          : Colors.grey,
                      size: 28,
                    ),
                    title: Text(
                      additionalTasks[index]['task'],
                      style: TextStyle(
                        fontSize: 18, // Same font size as compulsory tasks
                        fontWeight: FontWeight.w500, // Medium weight
                        color: allCompulsoryTasksCompleted
                            ? Colors.black87
                            : Colors.grey,
                      ),
                    ),
                    trailing: Checkbox(
                      value: additionalTasks[index]['isCompleted'],
                      onChanged: allCompulsoryTasksCompleted
                          ? (bool? value) {
                              _toggleTaskCompletion(additionalTasks, index);
                            }
                          : null,
                    ),
                  ),
                );
              },
            ),
          ),

          const SizedBox(height: 16),

          // Buttons Section
          Column(
            children: [
              ElevatedButton.icon(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const HistoryPage()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green[800],
                  padding: const EdgeInsets.symmetric(
                      horizontal: 24, vertical: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                icon: const Icon(Icons.history, color: Colors.white),
                label: const Text(
                  "Go to History Page",
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w500,
                    color: Colors.white,
                  ),
                ),
              ),
              const SizedBox(height: 12), // Space between buttons
              ElevatedButton.icon(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const GroupPage()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green[800],
                  padding: const EdgeInsets.symmetric(
                      horizontal: 24, vertical: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                icon: const Icon(Icons.group, color: Colors.white),
                label: const Text(
                  "Go to Group Page",
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w500,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    ),
  );
}

}
