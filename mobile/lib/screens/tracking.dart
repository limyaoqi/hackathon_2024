import 'package:flutter/material.dart';
import 'dart:async';

import 'package:flutter/widgets.dart';

class TrackingPage extends StatefulWidget {
  TrackingPage({
    super.key,
    required this.selectedTask,
    required this.currentTime,
    required this.selectedTaskTime,
    required this.isRunning,
    required this.startTimer,
    required this.stopTimer,
    required this.taskType,
    required this.taskIndex,
    required this.doneTask,
  });
  String selectedTask;
  int currentTime;
  int selectedTaskTime;
  String taskType;
  int taskIndex;
  bool isRunning;
  Function startTimer;
  Function stopTimer;
  Function doneTask;

  @override
  State<TrackingPage> createState() => _TrackingPageState();
}

class _TrackingPageState extends State<TrackingPage> {
  // Reset the timer
  // void resetTimer() {
  //   _timer?.cancel();
  //   setState(() {
  //     _currentTime = _start;
  //     isRunning = false;
  //   });
  // }

  // void setTask(String task) {
  //   setState(() {
  //     selectedTask = task;
  //   });
  // }

  void _doneTask(
      BuildContext context, String taskName, int index, String type) {
    showDialog(
        context: context,
        builder: (BuildContext ctx) {
          return AlertDialog(
            title: const Text('Please Confirm'),
            content: Text('Are you sure you are done with $taskName?'),
            actions: [
              // The "Yes" button
              TextButton(
                  onPressed: () {
                    Navigator.of(ctx).pop();
                  },
                  child: const Text('No')),
              TextButton(
                  onPressed: () {
                    widget.doneTask(index, type);

                    Navigator.of(ctx).pop();
                  },
                  child: const Text('Yes')),
            ],
          );
        });
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    bool isNegative = widget.currentTime < 0;
    double progress = widget.currentTime.abs() / widget.selectedTaskTime;
    String hours = ((widget.currentTime.abs() / 3600).floor()).toString();
    String minutes = ((widget.currentTime.abs() / 60).floor() % 60).toString();
    String seconds = (widget.currentTime.abs() % 60).toString();

    if (hours.length < 2) {
      setState(() {
        hours = "0$hours";
      });
    }
    if (minutes.length < 2) {
      setState(() {
        minutes = "0$minutes";
      });
    }
    if (seconds.length < 2) {
      setState(() {
        seconds = "0$seconds";
      });
    }

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          bottom: PreferredSize(
            preferredSize:
                Size.fromHeight(50.0), // Set the height for the TabBar
            child: Container(
              color: Colors.white, // Change background color of TabBar area
              child: TabBar(
                tabs: [
                  Tab(text: "Timer"),
                  Tab(text: "Distance"),
                ],
              ),
            ),
          ),
          title: const Text(
            "Task Tracking",
            style: TextStyle(
              fontSize: 24, // Increased font size for the app bar title
              fontWeight: FontWeight.w600,
              letterSpacing: 1.2, // Adding slight spacing for elegance
            ),
          ),
          backgroundColor: Colors.green[700],
          elevation: 4,
        ),
        body: TabBarView(
          children: [
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    widget.selectedTask == ""
                        ? "No task selected"
                        : widget.selectedTask,
                    style: TextStyle(fontSize: 26),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  Stack(
                    alignment: Alignment.center,
                    children: [
                      SizedBox(
                        child: CircularProgressIndicator(
                          value: progress, // The progress of the countdown
                          strokeWidth: 8.0,
                          valueColor:
                              AlwaysStoppedAnimation<Color>(Colors.blue),
                          backgroundColor: Colors.grey[300],
                        ),
                        height: 200.0,
                        width: 200.0,
                      ),
                      Text(
                        '${isNegative ? "-" : ""}$hours:$minutes:$seconds',
                        style: TextStyle(
                          fontSize: 40,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 40,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      SizedBox(
                        width: 60,
                        height: 60,
                        child: IconButton(
                          style: ButtonStyle(
                            backgroundColor:
                                MaterialStateProperty.resolveWith<Color>(
                              (Set<MaterialState> states) {
                                if (states.contains(MaterialState.disabled)) {
                                  return Color.fromARGB(255, 238, 230, 255);
                                } else {
                                  return Color(0xffDFCEFA);
                                }
                              },
                            ),
                          ),
                          onPressed: widget.selectedTask != ""
                              ? () {
                                  widget.isRunning
                                      ? widget.stopTimer()
                                      : widget.startTimer();
                                }
                              : null,
                          icon: Icon(widget.isRunning
                              ? Icons.pause
                              : Icons.play_arrow),
                          iconSize: 30,
                        ),
                      ),
                      SizedBox(width: 20),
                      SizedBox(
                        height: 60,
                        width: 60,
                        child: IconButton(
                          iconSize: 30,
                          style: ButtonStyle(
                            backgroundColor:
                                MaterialStateProperty.resolveWith<Color>(
                              (Set<MaterialState> states) {
                                if (states.contains(MaterialState.disabled)) {
                                  return Color.fromARGB(255, 238, 230, 255);
                                } else {
                                  return Color(0xffDFCEFA);
                                }
                              },
                            ),
                          ),
                          // onPressed: widget.selectedTask != "" ? widget.resetTimer : null,
                          onPressed: widget.selectedTask != ""
                              ? () {
                                  _doneTask(context, widget.selectedTask,
                                      widget.taskIndex, widget.taskType);
                                }
                              : null,
                          icon: Icon(Icons.check),
                        ),
                      )
                    ],
                  ),
                ],
              ),
            ),
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text("Current distance covered:", style: TextStyle(fontSize: 20),),
                  SizedBox(height: 20,),
                  Text("1.1 km", style: TextStyle(
                    fontSize: 30,
                    fontWeight: FontWeight.bold
                  ),)
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
