<?php
namespace Models;
class Orders {
    protected $app;
    public function __construct($app)
    {
        $this->app = $app;
    }

    public function get(\DateTime $from, \DateTime $to) {
        $querySelect = "
    SELECT 
	    p.name,
		SUM(oi.qty) AS qty,
		SUM(oi.price) AS price,
		SUM(oi.tax) AS tax,
		SUM(oi.price) - SUM(oi.tax) AS total
	FROM order_items oi 
	JOIN plates p ON oi.plate_id = p.id 
	LEFT JOIN orders o ON oi.order_id = o.id
	WHERE o.date BETWEEN :from AND :to
	GROUP BY oi.plate_id
        ";

        $stmt = $this->app->db->prepare($querySelect);

        $stmt->execute([
            'from' => $from->format('U'),
            'to' => $to->format('U'),
        ]);

        return $stmt->fetchAll();
    }
}