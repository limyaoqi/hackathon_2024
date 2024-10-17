import 'package:flutter/material.dart';
import 'package:mobile/screens/taskDetails.dart';

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
  // Method to toggle task completion
  // void _toggleTaskCompletion(List<Map<String, dynamic>> tasks, int index) {
  //   setState(() {
  //     tasks[index]['isCompleted'] = !tasks[index]['isCompleted'];
  //   });
  // }

  // Check if all compulsory tasks are completed
  bool _areAllcompulsoryTasksCompleted() {
    return widget.compulsoryTasks.every((task) => task['isCompleted']);
  }

  void _startTask(BuildContext context, String taskName, int index, String type,
      int taskTime) {
    showDialog(
        context: context,
        builder: (BuildContext ctx) {
          return AlertDialog(
            title: const Text('Please Confirm'),
            content: Text('Are you sure you want to start $taskName?'),
            actions: [
              // The "Yes" button
              TextButton(
                  onPressed: () {
                    Navigator.of(ctx).pop();
                  },
                  child: const Text('No')),
              TextButton(
                  onPressed: () {
                    setState(() {
                      if (type == "compulsory") {
                        widget.compulsoryTasks[index]['inProgress'] = true;
                      } else if (type == "additional") {
                        widget.additionalTasks[index]['inProgress'] = true;
                      }
                      widget.taskInProgress = true;
                      widget.setTask(taskName, taskTime, type, index);
                    });

                    Navigator.of(ctx).pop();
                  },
                  child: const Text('Yes')),
            ],
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    // Check if all compulsory tasks are completed
    bool allcompulsoryTasksCompleted = _areAllcompulsoryTasksCompleted();

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
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: widget.compulsoryTasks.length,
                itemBuilder: (context, index) {
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    child: GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => TaskDetailsPage(
                                taskName: widget.compulsoryTasks[index]['task'],
                                taskDetails: widget.compulsoryTasks[index]
                                    ['distance']),
                          ),
                        );
                      },
                      child: ListTile(
                        leading: widget.compulsoryTasks[index]['inProgress'] &&
                                !widget.compulsoryTasks[index]['isCompleted']
                            ? Icon(
                                Icons.timer,
                                color: Colors.yellow[600],
                              )
                            : Icon(
                                Icons.nature,
                                color: Colors.green[600],
                              ),
                        title: Text(widget.compulsoryTasks[index]['task']),
                        trailing: Checkbox(
                          tristate: true,
                          value: widget.compulsoryTasks[index]['isCompleted']
                              ? true
                              : widget.compulsoryTasks[index]['inProgress']
                                  ? null
                                  : false,
                          onChanged: widget.taskInProgress ||
                                  widget.compulsoryTasks[index]['isCompleted']
                              ? null
                              : (bool? value) {
                                  _startTask(
                                    context,
                                    widget.compulsoryTasks[index]['task'],
                                    index,
                                    "compulsory",
                                    widget.compulsoryTasks[index]['time'],
                                  );
                                  // _toggleTaskCompletion(widget.compulsoryTasks, index);
                                },
                        ),
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
                itemCount: widget.additionalTasks.length,
                itemBuilder: (context, index) {
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    child: ListTile(
                      leading: widget.additionalTasks[index]['inProgress'] &&
                              !widget.additionalTasks[index]['isCompleted']
                          ? Icon(
                              Icons.timer,
                              color: Colors.yellow[600],
                            )
                          : Icon(
                              Icons.nature,
                              color: allcompulsoryTasksCompleted
                                  ? Colors.green[600]
                                  : Colors.grey,
                            ),
                      title: Text(
                        widget.additionalTasks[index]['task'],
                        style: TextStyle(
                          color: allcompulsoryTasksCompleted
                              ? Colors.black
                              : Colors.grey, // Text is greyed out if disabled
                        ),
                      ),
                      trailing: Checkbox(
                        tristate: true,
                        value: widget.additionalTasks[index]['isCompleted']
                            ? true
                            : widget.additionalTasks[index]['inProgress']
                                ? null
                                : false,
                        onChanged: !allcompulsoryTasksCompleted ||
                                widget.taskInProgress ||
                                widget.additionalTasks[index]['isCompleted']
                            ? null
                            : (bool? value) {
                                _startTask(
                                  context,
                                  widget.additionalTasks[index]['task'],
                                  index,
                                  "additional",
                                  widget.additionalTasks[index]['time'],
                                );
                                // _toggleTaskCompletion(widget.compulsoryTasks, index);
                              },
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
