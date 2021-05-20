{ 
    "Launch-isprjxqmsre4vpcku3t7k524wy-dev": map(
        {
            PutRequest: {
                Item: ({
                    id: {
                        S: .id,
                    },
                    lat: {
                        N: (.lat | tostring),
                    },
                    lon: {
                        N: (.lon | tostring),
                    },
                    description: {
                        S: .description,
                    },
                    geohash: {
                        S: .geohash,
                    },
                    type: {
                        S: (.id | split(" ")[0])
                    },
                }
                    # Filter out any items that doesn't have a value
                    | with_entries(select(.value | .[] != null))
                )
            }
        }
    )
}