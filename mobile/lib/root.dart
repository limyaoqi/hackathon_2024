import 'package:flutter/material.dart';
import 'package:mobile/screens/home.dart';
import 'package:mobile/screens/profile.dart';
import 'package:mobile/screens/tracking.dart';

class RootPage extends StatefulWidget {
  const RootPage({super.key});

  @override
  State<RootPage> createState() => _RootPageState();
}

class _RootPageState extends State<RootPage> {
  int _selectedIndex = 1;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> widgetOptions = <Widget>[
      HomePage(),
      TrackingPage(),
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
