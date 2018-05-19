class Queue(deque):
    #static properties
    population = 0
    
    #initializing a queue, inherits from deque class
    def __init__(self, iterable=(), maxlen=None):
        deque.__init__(self, iterable,maxlen)
        self.id = Queue.population
        self.history = []
        Queue.population+=1
        self.nextTime = interval_generator.rvs(1)
        
    #record the queue length at a moment in time
    def record(self, time):
        self.history.append([time,len(self)])
    
    def tick(self,time):
        if self.nextTime <= time:
            self.appendleft(Car(time))
            self.nextTime = time+interval_generator.rvs(1)
        
class Car:
    # static properties
    population = 0
    cars = []
    exited = []
    #initializing a car
    def __init__(self, time):
        #store variables on instance
        self.id = Car.population
        self.traveled = 0
        self.history = []
        self.t_arrival = time
        # update the static properties
        Car.population += 1
        Car.cars.append(self)
        
    #traverse an intersection
    def traverse(self,queue):
        self.history.append(queue.id)#record where it's been for debugging
        self.traveled += 1 #increment the travel number
    
    #record the exit time and add car to list of exited vehicles
    def exit(self, time):
        self.t_exit = time
        Car.exited.append(self)

    def __repr__(self):
        return str(vars(self))
