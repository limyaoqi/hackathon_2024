import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class GroupPage extends StatefulWidget {
  const GroupPage({super.key});

  @override
  State<GroupPage> createState() => _GroupPageState();
}

class _GroupPageState extends State<GroupPage> {
  // Dummy data for group members and points
  final List<Map<String, dynamic>> groupMembers = [
    {"name": "Alice", "role": "Leader", "points": 120},
    {"name": "Bob", "role": "Member", "points": 85},
    {"name": "Charlie", "role": "Member", "points": 90},
    {"name": "Diana", "role": "Member", "points": 70},
    {"name": "Eve", "role": "Member", "points": 95},
  ];

  // Random motivational quote
  final String motivationalQuote =
      "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Group Members"),
        backgroundColor: Colors.green[700],
      ),
      body: Container(
        color: Colors.grey[100], // Light background for overall layout
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(vertical: 20.0, horizontal: 16.0),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Colors.green, Colors.blue],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(10.0),
              ),
              child: const Text(
                "Team Alpha", // Group name
                style: TextStyle(
                  fontSize: 28, // Increased font size
                  fontWeight: FontWeight.bold,
                  color: Colors.white, // White text color for contrast
                  letterSpacing: 1.2, // Added letter spacing for a better look
                ),
                textAlign: TextAlign.center, // Center the text
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: groupMembers.length,
                itemBuilder: (context, index) {
                  final member = groupMembers[index];
                  final isLeader = member['role'] == 'Leader';
                  final isCharlie = member['name'] == 'Charlie'; // Check if it's Charlie

                  return Card(
                    elevation: isLeader ? 6 : 2, // Elevate the leader card
                    shadowColor: isLeader ? Colors.yellow : Colors.grey, // Shadow color for the leader
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    color: isLeader
                        ? Colors.yellow[100]
                        : isCharlie
                            ? Colors.orange[100] // Highlight Charlie's card
                            : Colors.blue[50], // Default color for members
                    child: ListTile(
                      leading: Stack(
                        children: [
                          CircleAvatar(
                            backgroundColor: Colors.green[700],
                            child: Text(
                              member['name'][0], // Display first letter of the name
                              style: const TextStyle(color: Colors.white),
                            ),
                          ),
                          if (isLeader)
                            const Positioned(
                              right: 0,
                              bottom: 0,
                              child: Icon(
                                Icons.star, // Star icon to highlight leader
                                color: Colors.yellow,
                                size: 20,
                              ),
                            ),
                        ],
                      ),
                      title: Row(
                        children: [
                          Text(
                            member['name'],
                            style: TextStyle(
                              fontSize: 20, // Increased font size for focus
                              fontWeight: FontWeight.bold,
                              color: isLeader
                                  ? Colors.black
                                  : isCharlie
                                      ? Colors.deepOrange // Highlight Charlie's name
                                      : Colors.blue[800], // Different colors for other members
                            ),
                          ),
                          if (isLeader)
                            const Padding(
                              padding: EdgeInsets.only(left: 8.0),
                              child: Icon(
                                FontAwesomeIcons.crown, // Crown icon next to the leader's name
                                color: Colors.amber,
                                size: 24,
                              ),
                            ),
                        ],
                      ),
                      subtitle: Text(
                        "Role: ${member['role']}\nPoints: ${member['points']}",
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600, // Bold subtitle for emphasis
                          color: isLeader
                              ? Colors.black
                              : isCharlie
                                  ? Colors.deepOrange // Highlight Charlie's points
                                  : Colors.grey[700], // Subtitle color for other members
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 16), // Space before the quote
            Container(
              padding: const EdgeInsets.all(16.0), // Added padding around the quote
              decoration: BoxDecoration(
                color: Colors.amberAccent, // Vibrant background color for the quote
                borderRadius: BorderRadius.circular(8.0),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.2),
                    spreadRadius: 2,
                    blurRadius: 5,
                    offset: const Offset(0, 3), // Changes position of shadow
                  ),
                ],
              ),
              child: Text(
                motivationalQuote, // Motivational quote
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold, // Bold quote
                  fontStyle: FontStyle.italic,
                  color: Colors.black, // Dark text for contrast
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
