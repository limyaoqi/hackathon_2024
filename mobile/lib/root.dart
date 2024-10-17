import 'package:flutter/material.dart';
import 'package:mobile/screens/home.dart';
import 'package:mobile/screens/profile.dart';
import 'package:mobile/screens/tracking.dart';
import 'dart:async';

class RootPage extends StatefulWidget {
  const RootPage({super.key});

  @override
  State<RootPage> createState() => _RootPageState();
}

class _RootPageState extends State<RootPage> {
  int _selectedIndex = 0;
  bool taskInProgress = false;
  String taskName = "";
  Timer? _timer;
  int _start = 7200; // Total countdown time (60 seconds)
  int _currentTime = 7200; // Tracks remaining time
  bool isRunning = false;
  String taskType = "";
  int taskIndex = 0;
  List<Map<String, dynamic>> compulsoryTasks = [
    {
      "task": "Water the plants",
      "isCompleted": false,
      "inProgress": false,
      "time": 5
    },
    {
      "task": "Check soil moisture",
      "isCompleted": false,
      "inProgress": false,
      "time": 7200
    },
    {
      "task": "Add fertilizer",
      "isCompleted": false,
      "inProgress": false,
      "time": 14400
    },
  ];

// Additional plantation tasks with completion status
  List<Map<String, dynamic>> additionalTasks = [
    {
      "task": "Prune the plants",
      "isCompleted": false,
      "inProgress": false,
      "time": 14400
    },
    {
      "task": "Check for pests",
      "isCompleted": false,
      "inProgress": false,
      "time": 14400
    },
    {
      "task": "Clean the garden area",
      "isCompleted": false,
      "inProgress": false,
      "time": 28800
    },
  ];

  // Function to start the timer
  void startTimer() {
    setState(() {
      isRunning = true;
    });
    _timer = Timer.periodic(Duration(seconds: 1), (timer) {
      if (_currentTime == 0) {
        showDialog(
            context: context,
            builder: (BuildContext ctx) {
              return AlertDialog(
                title: const Text('Time\'s up!'),
                content: Text('Are you done with your work?'),
                actions: [
                  // The "Yes" button
                  TextButton(
                      onPressed: () {
                        Navigator.of(ctx).pop();
                      },
                      child: const Text('OK')),
                ],
              );
            });
      }
      // else {
      setState(() {
        _currentTime--;
      });
      // }
    });
  }

  // Function to stop the timer
  void stopTimer() {
    _timer?.cancel();
    setState(() {
      isRunning = false;
    });
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  void setTask(String tName, int tTime, String tType, int tIndex) {
    setState(() {
      taskName = tName;
      _start = tTime;
      _currentTime = tTime;
      taskType = tType;
      taskIndex = tIndex;
      taskInProgress = true;
    });
  }

  void doneTask(int index, String type) {
    setState(() {
      if (type == "compulsory") {
        compulsoryTasks[index]['isCompleted'] = true;
      } else if (type == "additional") {
        additionalTasks[index]['isCompleted'] = true;
      }
      // reset all vars
      _start = 7200;
      _currentTime = 7200;
      taskInProgress = false;
      taskName = "";
      taskType = "";
      taskIndex = 0;
      stopTimer();
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> widgetOptions = <Widget>[
      HomePage(
        taskInProgress: taskInProgress,
        setTask: setTask,
        additionalTasks: additionalTasks,
        compulsoryTasks: compulsoryTasks,
      ),
      TrackingPage(
        selectedTask: taskName,
        selectedTaskTime: _start,
        currentTime: _currentTime,
        isRunning: isRunning,
        startTimer: startTimer,
        stopTimer: stopTimer,
        taskIndex: taskIndex,
        taskType: taskType,
        doneTask: doneTask,
      ),
      ProfilePage()
    ];
    var page = widgetOptions.elementAt(_selectedIndex);
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: const Color(0xffDFCEFA),
        title: Container(
          width: double.infinity,
          height: 60,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text(
                'Ahmad',
                style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.black),
              ),
              const Text(
                '200 points',
                style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.black),
              ),
              InkWell(
                onTap: () {
                  _onItemTapped(2);
                },
                child: Container(
                  height: 30,
                  width: 30,
                  decoration: const BoxDecoration(
                    color: Color.fromARGB(255, 210, 210, 210),
                    shape: BoxShape.circle,
                    image: DecorationImage(
                      image: AssetImage("assets/images/profile.jpg"),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: const Color(0xffDFCEFA),
        type: BottomNavigationBarType.fixed,
        showSelectedLabels: false,
        showUnselectedLabels: false,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.timer), label: 'Tracking'),
          BottomNavigationBarItem(icon: Icon(Icons.group), label: 'Group'),
          BottomNavigationBarItem(
              icon: Icon(Icons.person), label: 'Profile & History')
        ],
        currentIndex: _selectedIndex,
        unselectedItemColor: const Color.fromARGB(255, 155, 155, 155),
        selectedItemColor: const Color.fromARGB(255, 114, 163, 187),
        onTap: _onItemTapped,
      ),
      body: page,
    );
  }
}
