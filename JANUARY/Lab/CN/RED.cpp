#include <iostream>
#include <ctime>
#include <cstdlib>
using namespace std;
class RED {
private:
    double minThreshold = 10;
    double maxThreshold = 50;
    double dropProbability = 0.2;
    int queueSize = 100;
    int bytesInQueue = 0;

public:
    // Function to simulate incoming traffic
    void simulateTraffic(int maxIterations) {
        int count = 0;
        while (count < maxIterations) {
            int incomingBytes = rand() % 1000;
            if (shouldDropPacket(incomingBytes)) {
                cout << "Packet dropped, queue size: " << bytesInQueue << endl;
            } else {
                bytesInQueue += incomingBytes;
               cout << "Packet added to queue, queue size: " << bytesInQueue << endl;
            }
            count++;
        }
    }

    // Function to decide whether to drop packet
    bool shouldDropPacket(int incomingBytes) {
        double averageSize = static_cast<double>(bytesInQueue) / queueSize;
        double probability = dropProbability * (averageSize - minThreshold) / (maxThreshold - minThreshold);
        return (rand() / static_cast<double>(RAND_MAX)) < probability;
    }
};

int main() {
    srand(time(0));
    RED red;
    red.simulateTraffic(10);
    return 0;
}
