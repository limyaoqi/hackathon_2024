import 'package:flutter/material.dart';

class TaskDetailsPage extends StatelessWidget {
  const TaskDetailsPage(
      {super.key, required this.taskName, required this.taskDetails});
  final String taskName;
  final String taskDetails;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          taskName,
          style: TextStyle(
            fontSize: 24, // Increased font size for the app bar title
            fontWeight: FontWeight.w600,
            letterSpacing: 1.2, // Adding slight spacing for elegance
          ),
        ),
        backgroundColor: Colors.green[700],
        elevation: 4,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              "Distance covered:",
              style: TextStyle(fontSize: 20),
            ),
            SizedBox(
              height: 20,
            ),
            Text(
              taskDetails,
              style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
            )
          ],
        ),
      ),
    );
  }
}
