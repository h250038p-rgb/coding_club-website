<?php // Admin view: lists stored submissions (protect/remove before real use)
$db = new PDO('sqlite:' . __DIR__ . '/club.db');
$db->exec('CREATE TABLE IF NOT EXISTS submissions(id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, email TEXT, course TEXT, type TEXT, message TEXT, created TEXT)');
$rows = $db->query('SELECT * FROM submissions ORDER BY id DESC')->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Submissions</title>
<link rel="stylesheet" href="../css/style.css"></head><body><main><h2>Submissions</h2>
<table><tr><th>Name</th><th>Email</th><th>Course</th><th>Type</th><th>Date</th></tr>
<?php foreach ($rows as $r): ?>
<tr><td><?= $r['name'] ?></td><td><?= htmlspecialchars($r['email']) ?></td><td><?= $r['course'] ?></td><td><?= $r['type'] ?></td><td><?= $r['created'] ?></td></tr>
<?php endforeach; ?></table></main></body></html>
