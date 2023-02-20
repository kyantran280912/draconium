/* eslint-disable jsx-a11y/alt-text */
'use client'; // this is a client component
import images from '@/img/images';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import anime from 'animejs';

type Props = {};

function Dragon(this: any, props: Props) {
    const [infoLeft, setinfoLeft] = useState<any>({
        healthLeft: 500,
        healthLeftPercent: 0,
        healthLeftRemain: 500,
    });

    const [infoRight, setinfoRight] = useState<any>({
        healthRight: 500,
        healthRightPercent: 0,
        healthRightRemain: 500,
    });
    const [myTurn, setmyTurn] = useState(1);

    // var yourTurn = anime.timeline({
    //     targets: '.your-turn',
    //     duration: 500,
    //     easing: 'easeOutExpo',
    //     // direction: 'alternate',
    // });

    useEffect(() => {
        welcomeAnimate();

        setTimeout(function () {
            showYourTurn();
        }, 4000);

        setTimeout(function () {
            setinfoRight((prevState: any) => {
                return {
                    ...prevState,
                    healthRightPercent: 100,
                };
            });
            setinfoLeft((prevState: any) => {
                return {
                    ...prevState,
                    healthLeftPercent: 100,
                };
            });
        }, 1000);
        $('.btn-skill').click(function () {
            clickSkill(this);
        });
    }, []);

    const welcomeAnimate = () => {
        anime({
            targets: '.effect-2',
            translateY: [{ value: 210, duration: 1200 }],
            delay: 2000,
        });
        anime({
            targets: '.info-left',
            opacity: [{ value: 1, duration: 3000 }],
            duration: 1000,
        });
        anime({
            targets: '.info-right',
            opacity: [{ value: 1, duration: 3000 }],
            duration: 1000,
        });
        anime({
            targets: '.health',
            width: [{ value: 400, duration: 2000, easing: 'easeOutQuint' }],
            delay: 1000,
        });
        anime({
            targets: '.dragon .image-left',
            translateX: [{ value: 500, duration: 2000, easing: 'easeOutQuint' }],
            delay: 1000,
        });
        anime({
            targets: '.dragon .image-right',
            translateX: [{ value: -890, duration: 2000, easing: 'easeOutQuint' }],
            delay: 1000,
        });
        anime({
            targets: '.skill',
            translateY: [{ value: -100, duration: 2000 }],
            delay: 3000,
        });
    };
    const showYourTurn = () => {
        $('.your-turn').show();

        // yourTurn.add({
        //     translateX: [{ value: 1200, duration: 1000, easing: 'easeOutQuint' }],
        //     opacity: [{ value: 1, duration: 500 }],
        // });

        anime({
            targets: '.your-turn',
            translateX: [{ value: 1200, duration: 1000, easing: 'easeOutQuint' }],
            opacity: [{ value: 1, duration: 500 }],
        });

        anime({
            targets: '.light-effect-left',
            opacity: [{ value: 1, duration: 2000 }],
        });

        $('.skill-overlay-1').hide(500);
        $('.skill-overlay-2').hide(500);
        $('.skill-overlay-3').hide(500);

        setTimeout(() => {
            anime({
                targets: '.your-turn',
                translateX: [{ value: 0, duration: 2000, easing: 'easeOutQuint' }],
                opacity: [{ value: 0, duration: 1000 }],
            });
        }, 2000);
    };
    const showYouWin = () => {
        anime({
            targets: '.you-win',
            translateY: [{ value: 410, duration: 1000, delay: 500 }],
            opacity: [{ value: 1, duration: 500 }],
        });
        $('.overlay').css('display', 'block');
        $('.overlay').css('opacity', 1);
        $('.success').css('opacity', 1);
        $('.btn-play-again').show();
        $('.btn-play-again').css('opacity', 1);
    };
    const showYouLose = () => {
        anime({
            targets: '.you-lose',
            translateY: [{ value: 410, duration: 1000, delay: 500 }],
            opacity: [{ value: 1, duration: 500 }],
        });

        $('.overlay').css('display', 'block');
        $('.overlay').css('opacity', 1);
        $('.btn-play-again').show();
        $('.btn-play-again').css('opacity', 1);
    };
    const clickSkill = (element: Element) => {
        var type = $(element).data('skill-type');
        var number = $(element).data('skill-number');
        var damage = parseInt(String(Math.random() * 100));
        $('.skill-gif-right').html(
            '<img src="/skill-gif/' +
                type +
                '-left-' +
                number +
                '.gif?x=' +
                Math.random() +
                '" class="skill-gif-image" />',
        );
        $('.skill-gif-right .skill-gif-image').show();
        notMyTurn();
        setTimeout(function () {
            $('.dragon-right .image').css('animation', 'shake 1.2s cubic-bezier(.36,.07,.19,.97) both');
            var randomLeftPercent = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
            $('.dragon-right').append(
                '<span class="health-fly" style="left:' + randomLeftPercent + '%">-' + damage + '</span>',
            );
        }, 800);
        setTimeout(function () {
            $('.dragon-right .image').attr('style', 'transform: translateX(-890px)');
            $('.skill-gif-image').remove();
            // healthRightRemain -= damage;
            setinfoRight((prev: any) => {
                const newHealth = prev.healthRightRemain - damage;

                if (newHealth <= 0) {
                    showYouWin();
                } else {
                    nextTurn();
                }

                return {
                    ...prev,
                    healthRightRemain: newHealth <= 0 ? 0 : newHealth,
                    healthRightPercent: newHealth <= 0 ? 0 : (newHealth / prev.healthRight) * 100,
                };
            });
        }, 2000);
    };
    const notMyTurn = () => {
        setmyTurn(0);
        anime({
            targets: '.light-effect-left',
            opacity: [{ value: 0, duration: 2000 }],
        });
        $('.skill-overlay-1').show();
        $('.skill-overlay-2').show();
        $('.skill-overlay-3').show();
    };
    const nextTurn = () => {
        anime({
            targets: '.light-effect-right',
            opacity: [{ value: 1, duration: 2000 }],
        });
        setTimeout(function () {
            var type = 'fire';
            var number = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
            var damage = parseInt(String(Math.random() * 100));
            $('.skill-gif-left').html(
                '<img src="/skill-gif/' +
                    type +
                    '-right-' +
                    number +
                    '.gif?x=' +
                    Math.random() +
                    '" class="skill-gif-image" />',
            );
            $('.skill-gif-left .skill-gif-image').show();
            setTimeout(function () {
                $('.dragon-left .image').css('animation', 'shake 1.2s cubic-bezier(.36,.07,.19,.97) both');
                var randomLeftPercent = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
                $('.dragon-left').append(
                    '<span class="health-fly" style="left:' + randomLeftPercent + '%">-' + damage + '</span>',
                );
            }, 800);
            setTimeout(function () {
                //   $(".dragon-left .image").attr('style', 'transform: translateX(500px)');
                $('.skill-gif-left .skill-gif-image').remove();
                setinfoLeft((prev: any) => {
                    const newHealth: number = prev.healthLeftRemain - damage;
                    if (newHealth <= 0) {
                        showYouLose();
                    } else {
                        showYourTurn();
                    }

                    return {
                        ...prev,
                        healthLeftRemain: newHealth <= 0 ? 0 : newHealth,
                        healthLeftPercent: newHealth <= 0 ? 0 : (newHealth / prev.healthLeft) * 100,
                    };
                });
            }, 2000);
        }, Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000);
    };
    console.log(myTurn);
    return (
        <div id="solo-arena">
            <Image src={images.effect1} alt="" className="effect-1" />
            <Image src={images.effect2} alt="" className="effect-2" />
            <Image src={images.youwin} alt="" className="you-win" />
            <Image src={images.youlose} alt="" className="you-lose" />
            <Image src={images.success} alt="" className="success" />
            <Image src={images.yourturn} alt="" className="your-turn" />
            <a href="/solo" className="btn btn-primary btn-play-again">
                PLAY AGAIN
            </a>
            <div className="player-1">
                <div className="info info-left">
                    <div className="avatar">
                        {/* <Image alt='' src="https://api.coopet.io/api/avatarImage/17.jpg"> */}
                    </div>
                    <p className="name">Dragon #1</p>
                    <div className="health-wrapper">
                        <div className="health" style={{ width: `${infoLeft.healthLeftPercent}%` }}></div>
                    </div>
                    <Image src={images.infoframe} alt="" className="frame" />
                </div>

                <div className="dragon dragon-left">
                    <Image alt="" src={images.lighteffect} className="light-effect-left" />
                    {/* <img src="https://api.coopet.io/api/characterImage/bHPQciUxmPhzo1qQVniIemlwIVb5Fjvt.png" className="image image-left"> */}
                    <Image
                        src="/dragonwater.png"
                        alt=""
                        className="image image-right h-full"
                        sizes="100vw"
                        width={0}
                        height={0}
                    />
                </div>
                <div className="skill">
                    <div className="skill-wrapper">
                        <Image
                            alt=""
                            src={images.waterskill_1}
                            className="btn-skill skill-1"
                            data-skill-type="water"
                            data-skill-number="1"
                        />
                        <div className="skill-overlay-1"></div>
                        <Image
                            alt=""
                            src={images.waterskill_2}
                            className="btn-skill skill-2"
                            data-skill-type="water"
                            data-skill-number="2"
                        />
                        <div className="skill-overlay-2"></div>
                        <Image
                            alt=""
                            src={images.waterskill_3}
                            className="btn-skill skill-3"
                            data-skill-type="water"
                            data-skill-number="3"
                        />
                        <div className="skill-overlay-3"></div>
                    </div>
                    <Image alt="" src={images.skillframe} className="frame" />
                </div>
            </div>
            <div className="player-2">
                <div className="info info-right">
                    <div className="avatar"></div>
                    <p className="name">Dragon #2</p>
                    <div className="health"></div>
                    <div className="health-wrapper">
                        <div
                            className="health"
                            style={{ width: `${infoRight.healthRightPercent}%` }}
                            //   :style="'width: '+healthRightPercent+'%'"
                        ></div>
                    </div>
                    <Image alt="" src={images.infoframe} className="frame" />
                </div>
                <div className="dragon dragon-right">
                    <Image alt="" src={images.lighteffect} className="light-effect-right" />
                    <Image
                        src="/dragonfire.png"
                        alt=""
                        className="image image-right"
                        width={0}
                        height={0}
                        sizes="100vw"
                    />
                </div>
                <div className="skill">
                    <div className="skill-wrapper">
                        <Image
                            alt=""
                            src={images.fireskill_1}
                            className="btn-skill skill-1"
                            data-skill-type="fire"
                            data-skill-number="1"
                        />
                        <div className="skill-overlay-1"></div>
                        <Image
                            alt=""
                            src={images.fireskill_2}
                            className="btn-skill skill-2"
                            data-skill-type="fire"
                            data-skill-number="2"
                        />
                        <div className="skill-overlay-2"></div>
                        <Image
                            alt=""
                            src={images.fireskill_3}
                            className="btn-skill skill-3"
                            data-skill-type="fire"
                            data-skill-number="3"
                        />
                        <div className="skill-overlay-3"></div>
                    </div>
                    <Image src={images.skillframe} alt="" className="frame" />
                </div>
            </div>
            <div className="skill-gif-right"></div>
            <div className="skill-gif-left"></div>
            <div className="overlay"></div>
        </div>
    );
}

export default Dragon;
