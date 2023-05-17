import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export default function Home() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const groundRef = useRef(null);
  const ballRef = useRef(null);
  const slingRef = useRef(null);
  const mouseConstraintRef = useRef(null);
  const firingRef = useRef(false);

  useEffect(() => {
    const engine = Matter.Engine.create();
    engineRef.current = engine;

    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: 1388,
        height: 890,
        wireframes: false,
      },
    });
    renderRef.current = render;

    const ground = Matter.Bodies.rectangle(1200, 500, 300, 20, { isStatic: true });
    groundRef.current = ground;

    const ball = Matter.Bodies.circle(300, 600, 20);
    ballRef.current = ball;

    const sling = Matter.Constraint.create({
      pointA: { x: 300, y: 600 },
      bodyB: ball,
      stiffness: 0.05,
    });
    slingRef.current = sling;

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        render: { visible: false },
      },
    });
    mouseConstraintRef.current = mouseConstraint;

    Matter.Events.on(mouseConstraint, 'enddrag', function (e) {
      if (e.body === ballRef.current) {
        firingRef.current = true;
      }
    });

    Matter.Events.on(engine, 'afterUpdate', function () {
      if (
        firingRef.current &&
        Math.abs(ballRef.current.position.x - 300) < 20 &&
        Math.abs(ballRef.current.position.y - 600) < 20
      ) {
        const newBall = Matter.Bodies.circle(300, 600, 20);
        ballRef.current = newBall;
        Matter.World.add(engine.world, newBall);
        slingRef.current.bodyB = newBall;
        firingRef.current = false;
      }
    });

    const stack = Matter.Composites.stack(1100, 270, 4, 4, 0, 0, function (x, y) {
      return Matter.Bodies.polygon(x, y, 8, 30);
    });

    Matter.World.add(engine.world, [stack, ground, ball, sling, mouseConstraint]);
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
