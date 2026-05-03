using System.Collections;
using UnityEngine;

public class Player_Movement : MonoBehaviour
{
    [SerializeField] private float movespeed = 6f;
    private Rigidbody2D rb;
    private float x;
    private float y;
    private Vector2 input;
    private Animator anim;
    private bool moving;

    [SerializeField] private AudioSource footstepSource;

    private void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        anim = GetComponent<Animator>();
    }

    void Update()
    {
        GetInput();
        Animate();
        HandleFootsteps(); 
    }

    private void FixedUpdate()
    {
        rb.linearVelocity = input * movespeed;
    }

    void GetInput()
    {
        x = Input.GetAxisRaw("Horizontal");
        y = Input.GetAxisRaw("Vertical");

        input = new Vector2(x, y);
        input.Normalize();
    }

    public void Animate()
    {
        if (input.magnitude > 0.1f)
        {
            moving = true;
        }
        else
        {
            moving = false;
        }

        if (moving)
        {
            anim.SetFloat("X", x);
            anim.SetFloat("Y", y);
        }
        anim.SetBool("isMoving", moving);
    }

    void HandleFootsteps()
    {
        if (moving)
        {
            if (!footstepSource.isPlaying)
            {
                footstepSource.Play();
            }
        }
        else
        {
            if (footstepSource.isPlaying)
            {
                footstepSource.Stop();
            }
        }
    }
    IEnumerator FadeOut(AudioSource source, float duration)
    {
        float startVolume = source.volume;

        while (source.volume > 0)
        {
            source.volume -= startVolume * Time.deltaTime / duration;
            yield return null;
        }

        source.Stop();
        source.volume = startVolume; // reset for next play
    }
}