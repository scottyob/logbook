map({
                    id: {
                        S: .id,
                    },
                    lat: {
                        N: (.lat | tostring),
                    },
                    lon: {
                        N: (.lon | tostring),
                    },
                    geohash: {
                        S: .geohash,
                    },
                    type: {
                        S: (.id | split(" ")[0])
                    },
                })[]
