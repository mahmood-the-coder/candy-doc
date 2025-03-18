export function isCollide(a, b) {

    return !(
        ((a.y + a.height / 2) < (b.y)) ||
        (a.y > (b.y + b.height / 2)) ||
        ((a.x + a.width / 2) < b.x) ||
        (a.x > (b.x + b.width / 2))
    );
}