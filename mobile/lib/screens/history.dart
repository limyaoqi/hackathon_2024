import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class HistoryPage extends StatefulWidget {
  const HistoryPage({super.key});

  @override
  State<HistoryPage> createState() => _HistoryPageState();
}

class _HistoryPageState extends State<HistoryPage> {
  final List<Map<String, dynamic>> taskHistory = [
    {
      "date": "2024-10-15",
      "compulsoryTasks": [
        {"task": "Water the plants", "isCompleted": true},
        {"task": "Check soil moisture", "isCompleted": true},
        {"task": "Prune the plants", "isCompleted": true},
      ],
      "additionalTasks": [
        {"task": "Clean the garden area", "isCompleted": false},
        {"task": "Add mulch", "isCompleted": false},
      ],
    },
    {
      "date": "2024-10-14",
      "compulsoryTasks": [
        {"task": "Add fertilizer", "isCompleted": true},
        {"task": "Check for pests", "isCompleted": true},
        {"task": "Trim the hedges", "isCompleted": false},
      ],
      "additionalTasks": [
        {"task": "Water the lawn", "isCompleted": false},
        {"task": "Remove weeds", "isCompleted": false},
      ],
    },
    {
      "date": "2024-10-13",
      "compulsoryTasks": [
        {"task": "Water the plants", "isCompleted": false},
        {"task": "Check soil moisture", "isCompleted": false},
        {"task": "Plant new seeds", "isCompleted": true},
      ],
      "additionalTasks": [
        {"task": "Harvest ripe vegetables", "isCompleted": false},
        {"task": "Mulch around new plants", "isCompleted": true},
      ],
    },
  ];

  DateTime? selectedDate;
  bool showAllTasks = false;

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2020),
      lastDate: DateTime(2025),
    );
    if (pickedDate != null && pickedDate != selectedDate) {
      setState(() {
        selectedDate = pickedDate;
        showAllTasks = false;
      });
    }
  }

  List<Map<String, dynamic>> _getFilteredTaskHistory() {
    if (selectedDate == null) {
      return taskHistory;
    }
    String formattedDate = DateFormat('yyyy-MM-dd').format(selectedDate!);
    return taskHistory
        .where((history) => history['date'] == formattedDate)
        .toList();
  }

  void _toggleShowAllTasks() {
    setState(() {
      showAllTasks = !showAllTasks;
    });
  }

  @override
  Widget build(BuildContext context) {
    List<Map<String, dynamic>> displayedTaskHistory =
        showAllTasks ? taskHistory : _getFilteredTaskHistory();

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Task History",
          style: TextStyle(
            fontSize: 24, // Increased font size for the app bar title
            fontWeight: FontWeight.w600,
            letterSpacing: 1.2, // Adding slight spacing for elegance
          ),
        ),
        backgroundColor: Colors.green[700],
        elevation: 4,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  selectedDate == null
                      ? 'Select a date'
                      : 'Selected Date: ${DateFormat('yyyy-MM-dd').format(selectedDate!)}',
                  style: const TextStyle(
                      fontSize: 18, fontWeight: FontWeight.bold),
                ),
                ElevatedButton.icon(
                  onPressed: () => _selectDate(context),
                  icon: const Icon(Icons.calendar_today),
                  label: const Text("Pick a Date"),
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 20, vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _toggleShowAllTasks,
              child: Text(
                showAllTasks ? "Show Filtered Tasks" : "Show All Tasks",
                style: const TextStyle(fontSize: 16),
              ),
              style: ElevatedButton.styleFrom(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: displayedTaskHistory.isEmpty
                  ? const Center(child: Text('No tasks found for this date.'))
                  : ListView.builder(
                      itemCount: displayedTaskHistory.length,
                      itemBuilder: (context, index) {
                        final history = displayedTaskHistory[index];
                        final String date = history['date'];
                        final List compulsoryTasks = history['compulsoryTasks'];
                        final List additionalTasks = history['additionalTasks'];

                        int completedCompulsoryTasks = compulsoryTasks
                            .where((task) => task['isCompleted'])
                            .length;
                        bool allCompulsoryCompleted =
                            completedCompulsoryTasks == compulsoryTasks.length;

                        return Card(
                          margin: const EdgeInsets.symmetric(vertical: 8.0),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          elevation: 4,
                          child: ExpansionTile(
                            title: Text(
                              "Tasks on $date",
                              style: const TextStyle(
                                  fontSize: 18, fontWeight: FontWeight.bold),
                            ),
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text(
                                      "Compulsory Tasks",
                                      style: TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold),
                                    ),
                                    Text(
                                        "Completed: $completedCompulsoryTasks / ${compulsoryTasks.length}"),
                                    const SizedBox(height: 8),
                                    ...compulsoryTasks.map<Widget>((task) {
                                      return ListTile(
                                        leading: Icon(
                                          task['isCompleted']
                                              ? Icons.check_circle
                                              : Icons.cancel,
                                          color: task['isCompleted']
                                              ? Colors.green
                                              : Colors.red,
                                        ),
                                        title: Text(
                                          task['task'],
                                          style: const TextStyle(fontSize: 16),
                                        ),
                                        subtitle: Text(
                                          task['isCompleted']
                                              ? 'Completed'
                                              : 'Not Completed',
                                          style: TextStyle(
                                            color: task['isCompleted']
                                                ? Colors.green[700]
                                                : Colors.red[300],
                                          ),
                                        ),
                                      );
                                    }).toList(),
                                  ],
                                ),
                              ),
                              if (allCompulsoryCompleted)
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        "Additional Tasks",
                                        style: TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold),
                                      ),
                                      Text(
                                          "Completed: ${additionalTasks.where((task) => task['isCompleted']).length} / ${additionalTasks.length}"),
                                      const SizedBox(height: 8),
                                      ...additionalTasks.map<Widget>((task) {
                                        return ListTile(
                                          leading: Icon(
                                            task['isCompleted']
                                                ? Icons.check_circle
                                                : Icons.cancel,
                                            color: task['isCompleted']
                                                ? Colors.green
                                                : Colors.red,
                                          ),
                                          title: Text(
                                            task['task'],
                                            style:
                                                const TextStyle(fontSize: 16),
                                          ),
                                          subtitle: Text(
                                            task['isCompleted']
                                                ? 'Completed'
                                                : 'Not Completed',
                                            style: TextStyle(
                                              color: task['isCompleted']
                                                  ? Colors.green[700]
                                                  : Colors.red[300],
                                            ),
                                          ),
                                        );
                                      }).toList(),
                                    ],
                                  ),
                                ),
                            ],
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
