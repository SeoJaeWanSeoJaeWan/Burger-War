"use client";
import { useEffect, useRef } from "react";
import GameTemplateStyle from "./gameTemplate.style";
import Core from "@/lib/game/core";


const GameTemplate = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;

        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const game = new Core(canvas.width, canvas.height);

        let lastTime = 0;

        const animate = (timeStamp: number) => {
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.update(deltaTime);
            game.draw(ctx);
            requestAnimationFrame(animate);
        }

        animate(0);
    }, [])

    return (
        <GameTemplateStyle.Container>
            <GameTemplateStyle.Canvas ref={canvasRef}></GameTemplateStyle.Canvas>
        </GameTemplateStyle.Container>
    );
};

export default GameTemplate;
