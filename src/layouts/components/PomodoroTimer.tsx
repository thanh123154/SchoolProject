import React, { useState, useEffect } from 'react';
import moment, { Duration } from 'moment';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Box, Button, Text } from '@mantine/core';

const PomodoroTimer = () => {
	const [mode, setMode] = useState<'Pomodoro' | 'Short Break' | 'Long Break'>('Pomodoro');
	const [iteration, setIteration] = useState(1);
	const [isPlaying, setIsPlaying] = useState(false);
	const [time, setTime] = useState<Duration>(moment.duration({ minutes: 25, seconds: 0 }));
	const [circleKey, setCircleKey] = useState(0)
	const [buttonColor, setButtonColor] = useState("red")

	useEffect(() => {
		let countdownTimer: NodeJS.Timeout;

		if (isPlaying) {
			countdownTimer = setInterval(() => {
				setTime((prevTime) => prevTime.subtract(1, 'second'));
			}, 1000);
		}

		if (time.asSeconds() === 0) {
			setIsPlaying(false);

			if (mode === 'Pomodoro') {
				if (iteration === 4) {
					setMode('Long Break');
					setTime(moment.duration(10, 'minutes'));
					setIteration(1);
				} else {
					setMode('Short Break');
					setTime(moment.duration(5, 'minutes'));
					setIteration((prevIteration) => prevIteration + 1);
				}
			} else {
				setMode('Pomodoro');
				setTime(moment.duration(25, 'minutes'));
			}
		}

		return () => {
			clearInterval(countdownTimer);
		};
	}, [isPlaying, mode, time, iteration]);

	const handleStart = () => {
		setIsPlaying(true);
	};

	const handleSkip = () => {
		setIsPlaying(false);
		setCircleKey(circleKey + 1)
		if (mode === 'Pomodoro') {
			if (iteration === 4) {
				setMode('Long Break');
				setTime(moment.duration(10, 'minutes'));
				setIteration(1);
			} else {
				setMode('Short Break');
				setTime(moment.duration(5, 'minutes'));
				setIteration((prevIteration) => prevIteration + 1);
			}
		} else {
			setMode('Pomodoro');
			setTime(moment.duration(25, 'minutes'));
		}
	};

	const handleReset = () => {
		setIsPlaying(false);
		setMode('Pomodoro');
		setIteration(1);
		setTime(moment.duration({ minutes: 25, seconds: 0 }));
		setCircleKey(circleKey + 1)
	};

	const formatTime = (time: Duration) => {
		const minutes = Math.floor(time.asMinutes());
		const seconds = time.seconds();
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	const getTimerColor = () => {
		if (mode === 'Pomodoro') {
			return '#e92020'; // Red color for Pomodoro
		} else if (mode === 'Short Break') {
			return '#246fe0'; // Blue color for Short Break
		} else {
			return '#3cb043'; // Green color for Long Break
		}
	};

	return (
		<Box
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				minHeight: 'calc(100vh - 79px)',
				justifyContent: 'center',
				gap: '16px',
			}}
		>
			<CountdownCircleTimer
				isPlaying={isPlaying}
				duration={time.asSeconds()}
				colors={[[getTimerColor()]]}
				initialRemainingTime={time.asSeconds()}
				size={400}
				strokeWidth={25}
				strokeLinecap={"butt"}
				key={circleKey}
				onComplete={() => {
					// Timer has completed
				}}
			>
				{() => (
					<Box sx={{display: "flex", flexDirection: "column", justifyContent:"center", fontSize: "1.5rem"}}>
						<Text size="xl" style={{ fontWeight: 'bold', marginBottom: '16px', display: "flex", justifyContent: "center", fontSize: "3rem" }}>
							{moment.utc(moment.duration(time, 'seconds').asMilliseconds()).format('mm:ss')}
						</Text>
						<Text>
							{`${mode} (${iteration})`}
						</Text>
					</Box>
				)}
			</CountdownCircleTimer>
			

			<Box style={{ display: 'flex', gap: "8px" }}>
				{isPlaying ? (
					<Button variant="filled" style={{ color: `${getTimerColor()}`, borderColor: `${getTimerColor()}` }} onClick={() => setIsPlaying(false)}>
						Pause
					</Button>
				) : (
					<Button variant="outline" style={{ color: `${getTimerColor()}`, borderColor: `${getTimerColor()}` }} onClick={handleStart}>
						Start
					</Button>
				)}

				<Button variant="outline" style={{ color: `${getTimerColor()}`, borderColor: `${getTimerColor()}` }} onClick={handleSkip}>
					Skip
				</Button>

				<Button variant="outline" style={{ color: `${getTimerColor()}`, borderColor: `${getTimerColor()}` }} onClick={handleReset}>
					Reset
				</Button>
			</Box>
		</Box>
	);
};

export default PomodoroTimer;