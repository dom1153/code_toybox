SELECT
    B.Name, A.Title
FROM
    Album A
RIGHT JOIN
    Artist B ON
        A.ArtistId = B.ArtistId
WHERE
    B.Name = 'Snow Patrol';