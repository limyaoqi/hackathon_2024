import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/root.dart';
import 'package:mobile/screens/group.dart';
import 'package:mobile/screens/history.dart';
import 'package:mobile/screens/home.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});


  static final _routes = [
    GoRoute(path: "/", builder: (context, state) => const HomePage()),
    GoRoute(path: "/root", builder: (context, state) => const RootPage(),),
    GoRoute(path: "/history", builder: (context, state) => const HistoryPage(),),    
    GoRoute(path: "/group", builder: (context, state) => const GroupPage(),)    

  ];

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: GoRouter(initialLocation: "/", routes: _routes),
      // routerConfig: GoRouter(initialLocation: "/pizzaScreen", routes: _routes),
    );
  }
}

// class Main extends StatefulWidget {
//   const Main({super.key, required this.title});

//   // This widget is the home page of your application. It is stateful, meaning
//   // that it has a State object (defined below) that contains fields that affect
//   // how it looks.

//   // This class is the configuration for the state. It holds the values (in this
//   // case the title) provided by the parent (in this case the App widget) and
//   // used by the build method of the State. Fields in a Widget subclass are
//   // always marked "final".

//   final String title;

//   @override
//   State<Main> createState() => _MainState();
// }

// class _MainState extends State<Main> {
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'PlantTrack',
//       debugShowCheckedModeBanner: false,
//       theme: ThemeData(
//         colorSchemeSeed: Colors.deepPurple,
//         useMaterial3: true,
//       ),
//       // home: const VerificationPage(verificationId: "dsd"),
//       home: RootPage(),
//     );
//   }
// }

