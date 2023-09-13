def bellman_ford(n, edges):
    dist = [float("inf") for _ in range(n)]
    dist[0] = 0
    for _ in range(n-1):
        for edge in edges:
            u, v, w = edge
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    return dist

n = int(input("Enter the number of nodes in the network: "))
m = int(input("Enter the number of edges in the network: "))
edges = []
for i in range(m):
    u, v, w = [int(x) for x in input(f"Enter the details of edge {i+1}: ").split()]
    edges.append((u, v, w))

dist = bellman_ford(n, edges)
for i in range(n):
    print(f"0 to {i}: {dist[i]}")
