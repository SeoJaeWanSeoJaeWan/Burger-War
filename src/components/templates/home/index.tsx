"use client";
import { useEffect, useRef } from "react";
import HomeTemplateStyle from "./homeTemplate.style";
import Image from "next/image";
import Player from "@/lib/game/test/player";
import Input from "@/lib/game/test/input";

const HomeTemplate = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;

        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const player = new Player(canvas.width, canvas.height);

        const input = new Input();

        let lastTime = 0;
        const animate = (timeStamp: number) => {
            const deltaTime = timeStamp - lastTime;
            lastTime = deltaTime;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            player.update(input.lastKey);
            player.draw(ctx, deltaTime);
            requestAnimationFrame(animate);
        }

        animate(0);
    }, []);

    return (
        <HomeTemplateStyle.Container>
            <HomeTemplateStyle.Canvas ref={canvasRef}></HomeTemplateStyle.Canvas>
        </HomeTemplateStyle.Container>
    );
};

export default HomeTemplate;
