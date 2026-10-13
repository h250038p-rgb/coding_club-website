<?php
// Processes the Join/Contact form and stores it in a SQLite database.
function clean($v) { return htmlspecialchars(trim($v ?? ''), ENT_QUOTES, 'UTF-8'); }
$ok = false; $msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = clean($_POST['name'] ?? ''); $email = trim($_POST['email'] ?? '');
  $course = clean($_POST['course'] ?? ''); $type = clean($_POST['type'] ?? '');
  $message = clean($_POST['message'] ?? '');
  if (strlen($name) < 3 || !filter_var($email, FILTER_VALIDATE_EMAIL) || $course === '') {
    $msg = 'Invalid details. Please go back and check the form.';
  } else {
    $db = new PDO('sqlite:' . __DIR__ . '/club.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->exec('CREATE TABLE IF NOT EXISTS submissions(id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT, email TEXT, course TEXT, type TEXT, message TEXT, created TEXT)');
    $st = $db->prepare('INSERT INTO submissions(name,email,course,type,message,created) VALUES(?,?,?,?,?,?)');
    $st->execute([$name, $email, $course, $type, $message, date('Y-m-d H:i:s')]);
    $ok = true; $msg = "Thank you, $name! Your request ($type) has been received.";
  }
}
?>
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Submitted | Code Club</title>
<link rel="stylesheet" href="../css/style.css"></head><body>
<main><div class="msg"><h2><?= $ok ? 'Success' : 'Oops' ?></h2><p><?= $msg ?></p>
<a class="btn" href="../index.html">Back to Home</a></div></main></body></html>
