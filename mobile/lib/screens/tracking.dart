import 'package:flutter/material.dart';
import 'dart:async';

class TrackingPage extends StatefulWidget {
  const TrackingPage({super.key});

  @override
  State<TrackingPage> createState() => _TrackingPageState();
}

class _TrackingPageState extends State<TrackingPage> {
  Timer? _timer;
  int _start = 60; // Total countdown time (60 seconds)
  int _currentTime = 60; // Tracks remaining time
  bool isRunning = false;

  // Function to start the timer
  void startTimer() {
    setState(() {
      isRunning = true;
    });
    _timer = Timer.periodic(Duration(seconds: 1), (timer) {
      if (_currentTime == 0) {
        timer.cancel();
        setState(() {
          isRunning = false;
        });
      } else {
        setState(() {
          _currentTime--;
        });
      }
    });
  }

  // Function to stop the timer
  void stopTimer() {
    _timer?.cancel();
    setState(() {
      isRunning = false;
    });
  }

  // Reset the timer
  void resetTimer() {
    _timer?.cancel();
    setState(() {
      _currentTime = _start;
      isRunning = false;
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    double progress = _currentTime / _start;

    return Scaffold(
      appBar: AppBar(
        title: Text('Timer Page'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Stack(
              alignment: Alignment.center,
              children: [
                SizedBox(
                  child: CircularProgressIndicator(
                    value: progress, // The progress of the countdown
                    strokeWidth: 8.0,
                    valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
                    backgroundColor: Colors.grey[300],
                  ),
                  height: 200.0,
                  width: 200.0,
                ),
                Text(
                  '$_currentTime',
                  style: TextStyle(
                    fontSize: 40,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: 40),
            ElevatedButton(
              onPressed: isRunning ? stopTimer : startTimer,
              child: Text(isRunning ? 'Stop' : 'Start'),
            ),
            ElevatedButton(
              onPressed: resetTimer,
              child: Text('Reset'),
            ),
          ],
        ),
      ),
    );
  }
}
