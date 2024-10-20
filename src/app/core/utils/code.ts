export const examples = [
  `#include <stdio.h>
#include <ctype.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <termios.h>

// initalize variables for x, and y coords for snake + cash
int headX, headY, cashX, cashY;
// create game board space
int width = 40, height = 30;
int bodyX[1000], bodyY[1000];

int gameOver = 0;
int direction = 2;
int speeds = 0.8i;
int length = 0;
int score = 0;
int speed = 100000;

// main game functions
void render(void);
void setupGame(void);
void checkInput(void);
void moveSnake(void);
void checkGameOver(void);
void spawnCash(void);
void checkCash(void);

// Re-implementing functions from conio.h - an old dos library 
int kbhit(void);
char getch(void);

void main() {
    setupGame();
    spawnCash();

    while(!gameOver) {
        render();
        checkInput();
        moveSnake();
        checkCash();
        checkGameOver();
        usleep(speed);
    }
    usleep(speed);
    for (int bb = 0; bb < 60; bb++) { printf("\n"); }
    printf("\n\n\n\t\tFINAL SCORE : %5d\n\n\t\tNOKIA BRICK FOREVER!!!\n\t\t(press any + enter to exit)\n\t\t\t>>", score);
    scanf(">>");
    system("clear");
}

// render game in terminal
void render(void) {
    // removed system("clear"), and replaced with a loop of printing new lines.
    for (int b = 0; b < 60; b++) { printf("\n"); }
    int i, j, k, p;
    // iterate through all the y coords
    for (j = 0; j <= height; j++) {
        // iterate through all the  x coords
        for (i = 0; i <= width; i++) {
            p = 1;
            // generate the border
            if (i == 0 || j == 0 || j == height || i == width) {
                printf("X");
            }
            // print a '$ if the x+y coords match the location of the spawned cash
            else if (i == cashX && j == cashY) {
                printf("$");
            }
            // print a directional arrow if the x+y coords match the snake's head
            else if (i == headX && j == headY) {
                if (direction == 1) {
                    printf("^");
                }
                else if (direction == 2) {
                    printf(">");
                }
                else if (direction == 3) {
                    printf("v");
                }
                else if (direction == 4) {
                    printf("<");
                }
                // add code here to change the snakes head to a directionally appropriate arrow.
            }
            else {
                for (k = 0; k < length; k++) {
                    if (i == bodyX[k] && j == bodyY[k]) {
                        printf("x");
                        p = 0;
                    }
                }
                if (p) {
                printf(" ");           
                }
            }
        }
        printf("\n");
    }
    printf("Score: %5d", score);
}

void spawnCash(void) {
    spawnCashX : cashX = rand() % 20;
    if (cashX <= 2 || cashX >= width - 2) {
        goto spawnCashX;
    }
    spawnCashY : cashY = rand() % 20;
    if (cashY <= 2 || cashX >= width - 2) {
        goto spawnCashY;
    }
}

void setupGame(void) {
    headX = height / 2;
    headY = width / 2;
}

void checkCash(void) {
    if (headX == cashX && headY == cashY) {
        score += 10;
        length++;
        speed -= 1000;
        spawnCash();
    }
}

void checkInput(void) {
    if (kbhit()) {
        char key = getch();
        switch (key) {
            case 'w':
                if (direction != 3)
                    direction = 1;
                break;
            case 'd':
                if (direction != 4)
                    direction = 2;
                break;
            case 's':
                if (direction != 1)
                    direction = 3;
                break;
            case 'a':
                if (direction != 2)
                    direction = 4;
        }
    }
}

void moveSnake(void) {
    int x1, x2, y1, y2, i;

    if (length == 1) {
        bodyX[0] = headX;
        bodyY[0] = headY;
    }
    else {
        x1 = headX;
        y1 = headY;

        for (i = 0; i < length; i++) {
            x2 = bodyX[i];
            y2 = bodyY[i];
            bodyX[i] = x1;
            bodyY[i] = y1;
            x1 = x2;
            y1 = y2;
        }
    }
    switch (direction) {
        case 1:
            headY--;
            break;
        case 2:
            headX++;
            break;
        case 3:
            headY++;
            break;
        case 4:
            headX--;
    }
}

void checkGameOver(void) {
    int i;
    if (headX == width || headX == 0 || headY == height || headY == 0) {
            gameOver = 1;
    }
    for (i = 0; i < length; i++) {
        // check if the head has collided with the body
        if (headX == bodyX[i] && headY == bodyY[i]) {
            gameOver = 1;
        }
    }
}

// original repository for the following: https://github.com/zoelabbb/conio.h/blob/master/conio.h
// conio.h function to determine if a keyboard key was pressed.
int kbhit(void) {
    struct termios oldt, newt;
    int ch;
    int oldf;

    tcgetattr(STDIN_FILENO, &oldt);
    newt = oldt;
    newt.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &newt);
    oldf = fcntl(STDIN_FILENO, F_GETFL, 0);
    fcntl(STDIN_FILENO, F_SETFL, oldf| O_NONBLOCK);

    ch = getchar();

    tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
    fcntl(STDIN_FILENO, F_SETFL, oldf);

    if(ch != EOF) {
        ungetc(ch, stdin);
        return 1;
    }
    return 0;
}

char getch(void) {
    char c;

    system("stty raw");
    c = getchar();
    system("stty sane");
    
    return(c);
}`,
  `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
#include <thread>
#include <chrono>
#include <cmath>
#include <functional>
#include <mutex>

std::mutex mtx;

// Basic function
int add(int a, int b) {
    return a + b;
}

// Template function
template <typename T>
T multiply(T a, T b) {
    return a * b;
}

// Recursive function
int factorial(int n) {
    if (n <= 1)
        return 1;
    return n * factorial(n - 1);
}

// Struct with constructor
struct Person {
    std::string name;
    int age;
    
    Person(std::string n, int a) : name(n), age(a) {}
    
    void display() {
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
    }
};

// Class with inheritance
class Animal {
public:
    virtual void sound() {
        std::cout << "Some animal sound..." << std::endl;
    }
};

class Dog : public Animal {
public:
    void sound() override {
        std::cout << "Woof woof!" << std::endl;
    }
};

// Lambda function
auto square = [](int x) {
    return x * x;
};

// Thread function
void printNumbers() {
    for (int i = 1; i <= 5; ++i) {
        std::this_thread::sleep_for(std::chrono::milliseconds(500));
        std::cout << i << std::endl;
    }
}

// Using mutex in threads
void printMessage(const std::string& msg) {
    mtx.lock();
    std::cout << msg << std::endl;
    mtx.unlock();
}

int main() {
    // Basic I/O
    std::cout << "Enter two numbers: ";
    int a, b;
    std::cin >> a >> b;
    std::cout << "Sum: " << add(a, b) << std::endl;
    
    // Template function
    std::cout << "Product: " << multiply(3.5, 2.5) << std::endl;

    // Recursion
    std::cout << "Factorial of 5: " << factorial(5) << std::endl;

    // Struct and method
    Person p("Alice", 30);
    p.display();
    
    // Inheritance and virtual function
    Animal* animal = new Dog();
    animal->sound();
    delete animal;
    
    // Using lambda
    std::cout << "Square of 6: " << square(6) << std::endl;
    
    // Using vectors and algorithms
    std::vector<int> vec = {1, 5, 3, 7, 2, 8};
    std::sort(vec.begin(), vec.end());
    std::cout << "Sorted vector: ";
    for (int v : vec) {
        std::cout << v << " ";
    }
    std::cout << std::endl;
    
    // Using map
    std::map<std::string, int> phonebook;
    phonebook["John"] = 12345;
    phonebook["Jane"] = 67890;
    
    for (const auto& entry : phonebook) {
        std::cout << entry.first << ": " << entry.second << std::endl;
    }
    
    // Multithreading
    std::thread t1(printNumbers);
    std::thread t2(printMessage, "Hello from thread 2");
    
    t1.join();
    t2.join();

    return 0;
}`,
  `#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <memory>
#include <exception>
#include <stdexcept>
#include <functional>

// Custom exception class
class MyException : public std::exception {
public:
    const char* what() const noexcept override {
        return "Custom Exception: Something went wrong!";
    }
};

// Simple class with operator overloading
class Complex {
public:
    double real, imag;

    Complex(double r, double i) : real(r), imag(i) {}

    // Overload + operator
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }

    // Overload << operator for output
    friend std::ostream& operator<<(std::ostream& os, const Complex& c) {
        os << c.real << " + " << c.imag << "i";
        return os;
    }
};

// Smart pointer example
class Resource {
public:
    Resource() {
        std::cout << "Resource acquired\n";
    }

    ~Resource() {
        std::cout << "Resource destroyed\n";
    }

    void sayHello() const {
        std::cout << "Hello from Resource!\n";
    }
};

// Function using smart pointers
void useSmartPointer() {
    std::unique_ptr<Resource> resPtr = std::make_unique<Resource>();
    resPtr->sayHello();
}

// File I/O
void fileIOExample() {
    // Writing to file
    std::ofstream outfile("example.txt");
    if (outfile.is_open()) {
        outfile << "This is a line of text.\n";
        outfile << "This is another line of text.\n";
        outfile.close();
    } else {
        std::cerr << "Unable to open file for writing!\n";
    }

    // Reading from file
    std::ifstream infile("example.txt");
    if (infile.is_open()) {
        std::string line;
        while (std::getline(infile, line)) {
            std::cout << line << std::endl;
        }
        infile.close();
    } else {
        std::cerr << "Unable to open file for reading!\n";
    }
}

// Function that throws an exception
void mightThrow(bool shouldThrow) {
    if (shouldThrow) {
        throw MyException();
    } else {
        std::cout << "No exception thrown!\n";
    }
}

// Template class
template <typename T>
class Box {
public:
    T value;

    Box(T val) : value(val) {}

    T getValue() const {
        return value;
    }
};

// Function with a callback using std::function
void executeCallback(const std::function<void()>& callback) {
    std::cout << "Executing callback...\n";
    callback();
}

int main() {
    try {
        // Complex number operations
        Complex c1(2.3, 4.5);
        Complex c2(1.7, 3.9);
        Complex result = c1 + c2;
        std::cout << "Complex number addition result: " << result << std::endl;

        // Smart pointers example
        useSmartPointer();

        // File I/O example
        fileIOExample();

        // Template class usage
        Box<int> intBox(123);
        Box<std::string> strBox("Hello");
        std::cout << "Box with int: " << intBox.getValue() << std::endl;
        std::cout << "Box with string: " << strBox.getValue() << std::endl;

        // Exception handling
        mightThrow(true); // This will throw an exception
    } catch (const MyException& e) {
        std::cerr << e.what() << std::endl;
    }

    // Callback usage
    auto myCallback = []() { std::cout << "Callback function executed!" << std::endl; };
    executeCallback(myCallback);

    return 0;`,
];
