#Libraries
import RPi.GPIO as GPIO
import time
 
#GPIO Mode (BOARD / BCM)
GPIO.setmode(GPIO.BCM)
 
#set GPIO Pins
GPIO_TRIGGER = 4
GPIO_ECHO = 17
 
#set GPIO direction (IN / OUT)
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)
 
def distance():
    # set Trigger to HIGH
    GPIO.output(GPIO_TRIGGER, True)
 
    # set Trigger after 0.01ms to LOW
    time.sleep(0.00001)
    GPIO.output(GPIO_TRIGGER, False)
 
    StartTime = time.time()
    StopTime = time.time()
 
    # save StartTime
    while GPIO.input(GPIO_ECHO) == 0:
        StartTime = time.time()
 
    # save time of arrival
    while GPIO.input(GPIO_ECHO) == 1:
        StopTime = time.time()
 
    # time difference between start and arrival
    TimeElapsed = StopTime - StartTime
    # multiply with the sonic speed (34300 cm/s)
    # and divide by 2, because there and back
    distance = (TimeElapsed * 34300) / 2
 
    return distance

prev_status = 0
curr_status = 0
while True:
    dist = distance()
    print ("Measured Distance = %.1f cm" % dist)
    if dist < 150:
        curr_status = 1
        if prev_status != curr_status:
            lotstatus = "http://fyp.yogacheung.com/updatelotstatus/1"
            response = urllib.urlopen(lotstatus).read()
            print response
        prev_status = 1
    else: 
        curr_status = 0
        if prev_status != curr_status:
            lotstatus = "http://fyp.yogacheung.com/updatelotstatus/1"
            response = urllib.urlopen(lotstatus).read()
            print response
        prev_status = 0
    time.sleep(1)